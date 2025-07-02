import { Link, Text, View } from "@react-pdf/renderer";
import React, { JSX } from "react";
import ReactHtmlParser from "react-html-parser";
import { getUniqId } from "./utils";

interface ParsedElementProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const htmlParser = (taskDescription: string | null): JSX.Element => {
  const parseElements = (elements: React.ReactNode): React.ReactNode[] => {
    const returnContentConst: React.ReactNode[] = [];

    React.Children.forEach(elements, (element) => {
      if (typeof element === "string") {
        // Handle string content
        returnContentConst.push(<Text key={getUniqId()}>{element}</Text>);
      } else if (React.isValidElement(element)) {
        console.log(element);
        const elementProps = element.props as ParsedElementProps;
        const type = element.type;
        const children = parseElements(elementProps.children);

        switch (type) {
          case "p":
            returnContentConst.push(<Text key={getUniqId()}>{children}</Text>);
            break;
          case "strong":
            returnContentConst.push(
              <Text key={getUniqId()} style={{ fontWeight: 700 }}>
                {children}
              </Text>
            );
            break;
          case "em":
            returnContentConst.push(
              <Text key={getUniqId()} style={{ fontStyle: "italic" }}>
                {children}
              </Text>
            );
            break;
          case "u":
            returnContentConst.push(
              <Text key={getUniqId()} style={{ textDecoration: "underline" }}>
                {children}
              </Text>
            );
            break;
          case "a":
            returnContentConst.push(
              <Link
                src={elementProps.href}
                key={getUniqId()}
                style={{ color: "#0066cc", textDecoration: "underline" }}
              >
                {children}
              </Link>
            );
            break;
          case "ul":
          case "ol":
            returnContentConst.push(
              <View key={getUniqId()} style={{ marginBottom: 4 }}>
                {children}
              </View>
            );
            break;
          case "li":
            returnContentConst.push(
              <Text key={getUniqId()}>• {children}</Text>
            );
            break;
          case "br":
            returnContentConst.push(<Text key={getUniqId()}>{"\n"}</Text>);
            break;
          default:
            returnContentConst.push(<Text key={getUniqId()}>{children}</Text>);
            break;
        }
      }
    });

    return returnContentConst;
  };

  if (taskDescription) {
    console.log(taskDescription);
    const parsedHtml = ReactHtmlParser(taskDescription);

    console.log(parsedHtml);
    const returnContentConst = parseElements(parsedHtml);

    console.log(returnContentConst);
    return <>{returnContentConst}</>;
  } else {
    return <></>;
  }
};
