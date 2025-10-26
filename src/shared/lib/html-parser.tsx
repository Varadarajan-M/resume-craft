import { Circle, Link, Svg, Text, View } from '@react-pdf/renderer';
import React, { JSX } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getUniqId } from './utils';

interface ParsedElementProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export const htmlParser = (taskDescription: string | null): JSX.Element => {
  const parseElements = (elements: React.ReactNode): React.ReactNode[] => {
    const returnContentConst: React.ReactNode[] = [];

    React.Children.forEach(elements, (element) => {
      if (typeof element === 'string') {
        // Handle string content
        returnContentConst.push(<Text key={getUniqId()}>{element}</Text>);
      } else if (React.isValidElement(element)) {
        const elementProps = element.props as ParsedElementProps;
        const type = element.type;
        const children = parseElements(elementProps.children);

        switch (type) {
          case 'p':
            returnContentConst.push(<Text key={getUniqId()}>{children}</Text>);
            break;
          case 'strong':
            returnContentConst.push(
              <Text key={getUniqId()} style={{ fontWeight: 700 }}>
                {children}
              </Text>
            );
            break;
          case 'em':
            returnContentConst.push(
              <Text key={getUniqId()} style={{ fontStyle: 'italic' }}>
                {children}
              </Text>
            );
            break;
          case 'u':
            returnContentConst.push(
              <Text key={getUniqId()} style={{ textDecoration: 'underline' }}>
                {children}
              </Text>
            );
            break;
          case 'a':
            returnContentConst.push(
              <Link
                src={elementProps.href as string}
                key={getUniqId()}
                style={{
                  color: '#0066cc',
                  textDecoration: 'underline',
                  ...(elementProps?.style || {}),
                }}
              >
                {children}
              </Link>
            );
            break;
          case 'ul':
          case 'ol':
            returnContentConst.push(
              <View key={getUniqId()} style={{ marginBottom: 4 }}>
                {children}
              </View>
            );
            break;
          case 'li':
            returnContentConst.push(
              <View
                key={getUniqId()}
                style={{ flexDirection: 'row', gap: 4, marginBottom: 2 }}
                wrap={false}
              >
                <Svg width={4} height={4} style={{ marginTop: 5 }}>
                  <Circle cx={2} cy={2} r={2} fill="#000000" />
                </Svg>
                <Text style={{ flex: 1 }} widows={2}>
                  {children}
                </Text>
              </View>
            );
            break;
          case 'br':
            returnContentConst.push(<Text key={getUniqId()}>{'\n'}</Text>);
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
    const parsedHtml = ReactHtmlParser(taskDescription);

    const returnContentConst = parseElements(parsedHtml);

    return <>{returnContentConst}</>;
  } else {
    return <></>;
  }
};
