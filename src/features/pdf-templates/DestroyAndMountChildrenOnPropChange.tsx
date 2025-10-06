import React from "react";

const DestroyAndMountChildrenOnPropChange = ({
  children,
  prop,
}: {
  prop: unknown;
  children: (key: string) => React.ReactNode;
}) => {
  const ref = React.useRef<number>(0);

  React.useEffect(() => {
    ref.current += 1;
  }, [prop]);

  return <React.Fragment>{children(ref?.current?.toString())}</React.Fragment>;
};

export default DestroyAndMountChildrenOnPropChange;
