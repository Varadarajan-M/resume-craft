const ResumeCraftIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L2 12L12 22L22 12L12 2Z"
        fill="black" // Fill color for the diamond
        style={{fill: "var(--foreground)"}} // Use CSS variable for background color
      />
      <path
        d="M12 6L7 11L17 11L12 6Z"
        fill="white" // Fill color for the inner triangle (matches background in image)
         style={{fill: "var(--background)"}} // Use CSS variable for background color
      />
    </svg>
  );
};

export default ResumeCraftIcon;