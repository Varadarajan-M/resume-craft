import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { Eye, EyeOff, Grip, Info, Settings2 } from 'lucide-react';
import { Reorder } from 'motion/react';
import { useResumeStore } from '../../store/resume';
import ResumeSection from '../resume-sections/ResumeSection';

const SectionConfig = () => {
  const config = useResumeStore((state) => state.resume?.config);

  const mainColumnSectionOrder = config?.mainColumnSectionOrder;

  const updateProperties = useResumeStore((state) => state.updateProperties);

  const sectionDetails = useResumeStore(
    (state) => state.resume?.config?.sectionDetails
  );

  const handleToggleSectionVisibility = (sectionId: string) => {
    updateProperties({
      config: {
        ...config!,
        // @ts-expect-error Type 'undefined' is not assignable to type 'string'
        sectionDetails: {
          ...sectionDetails,
          [sectionId]: {
            ...sectionDetails?.[sectionId],
            visible: !sectionDetails?.[sectionId]?.visible,
          },
        },
      },
    });
  };

  return (
    <ResumeSection
      title="Section Configuration"
      subtitle="Toggle visibility or reorder the sections of your resume."
      icon={<Settings2 className="h-4 w-4" />}
      defaultOpen
    >
      <div className="">
        {/* <h3 className="text-sm font-medium underline p-2">
          Main Column Sections
        </h3> */}
        <div className="flex flex-col gap-2 border border-accent border-dashed rounded-md p-2 bg-neutral-200/35 dark:bg-neutral-800/35">
          <Reorder.Group
            axis="y"
            values={mainColumnSectionOrder || []}
            onReorder={(newOrder) => {
              updateProperties({
                config: {
                  ...config!,
                  mainColumnSectionOrder: newOrder,
                },
              });
            }}
            className="flex flex-col gap-3"
          >
            {mainColumnSectionOrder?.map((sectionId) => (
              <Reorder.Item
                key={sectionId}
                value={sectionId}
                className="flex items-center justify-between gap-2 p-3 rounded-md bg-background hover:bg-accent dark:hover:bg-accent/50 cursor-grab"
              >
                <div className="flex items-center gap-2">
                  <Grip className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">
                    {sectionDetails?.[sectionId]?.name || sectionId}
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleSectionVisibility(sectionId)}
                    >
                      {sectionDetails?.[sectionId]?.visible ? (
                        <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={-15}
                    className="flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />{' '}
                    {sectionDetails?.[sectionId]?.visible
                      ? 'Visible, Click to hide'
                      : 'Hidden, Click to show'}
                  </TooltipContent>
                </Tooltip>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </ResumeSection>
  );
};

export default SectionConfig;
