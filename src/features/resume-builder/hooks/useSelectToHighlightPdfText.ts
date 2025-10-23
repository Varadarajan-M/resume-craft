import { useEffect, useRef } from 'react';

export const useSelectToHighlightPdfText = () => {
  const resumePreviewPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resumePreviewPanel = resumePreviewPanelRef.current;

    if (!resumePreviewPanel) return;

    const getAllTextNodesAndInputs = (root: HTMLElement) => {
      const results: { text: string; element: HTMLElement }[] = [];

      const traverse = (node: HTMLElement) => {
        // Case 1: Input or textarea → take its value
        if (
          node instanceof HTMLInputElement ||
          node instanceof HTMLTextAreaElement
        ) {
          const value = node.value?.trim();
          if (value) {
            results.push({ text: value, element: node });
          }
          return;
        }

        // Case 2: Normal text nodes inside element
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent?.trim();
            if (text) {
              results.push({
                text,
                element: node, // associate with current element
              });
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            traverse(child as HTMLElement); // Recurse deeper
          }
        });
      };

      traverse(root);
      return results;
    };

    const findBestResumeMatch = (selectedText: string) => {
      const resumeSectionsPanel = document.getElementById(
        'resume-sections-panel'
      );
      if (!resumeSectionsPanel) return;

      const nodes = getAllTextNodesAndInputs(resumeSectionsPanel!);

      const matches = nodes.map((n) => ({
        ...n,
        score: n.text?.includes(selectedText) ? 1 : 0,
      }));

      const best = matches.filter((item) => item?.score === 1)?.at(0);

      if (best) {
        if (best.element instanceof HTMLParagraphElement) {
          // scroll to the parent container of the paragraph
          const closestListItem = best.element.closest(
            '.rich-text-editor-tiptap'
          );
          if (closestListItem) best.element = closestListItem as HTMLElement;
        }

        best?.element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        best?.element?.classList.add('highlight');
        setTimeout(() => best.element?.classList.remove('highlight'), 2000);
      }
    };

    const handleMouseUp = () => {
      // select all closed accordions to ensure text nodes are visible
      const closedItems = document.querySelectorAll(
        '.accordion-trigger[data-state="closed"]'
      );

      // open all closed accordions to ensure text nodes are visible
      closedItems.forEach((el) => {
        (el as HTMLElement).click();
      });

      setTimeout(() => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();
        if (selectedText) {
          findBestResumeMatch(selectedText);
        }
      }, 300); // wait for accordions to open
    };

    resumePreviewPanel.addEventListener('mouseup', handleMouseUp);

    return () => {
      resumePreviewPanel.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return resumePreviewPanelRef;
};
