import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import {
  FixedSizeList,
  FixedSizeListProps,
  ListChildComponentProps,
  VariableSizeList,
  VariableSizeListProps,
} from 'react-window';
import styled, { AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import ListItem from './ListItem';

import {
  ListAppProps,
  ListStyledProps,
  ListVariableStyledProps,
} from '../../types/html';

const UlStyles = styled.ul<AppStyledProps>(({ $styles }) => [tw`m-0`, $styles]);

export const ListStyled = styled(FixedSizeList)<ListStyledProps>(
  ({ $styles }) => [$styles],
);

export const VariableStyled = styled(VariableSizeList)<ListVariableStyledProps>(
  ({ $styles }) => [$styles],
);

const List: FC<ListAppProps<FixedSizeListProps, VariableSizeListProps>> = ({
  containerStyles,
  children,
  ListType = ListStyled,
  ...otherPros
}) => (
  <ListType
    innerElementType={UlStyles}
    $styles={containerStyles}
    {...otherPros}
  >
    {({ data, index, style }: ListChildComponentProps): ReactElement => {
      const ChildrenWithProps = Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<{ data: unknown }>, {
            data: data[index],
          });
        }
        return child;
      }) as ReactNode;

      return <ListItem style={style}>{ChildrenWithProps}</ListItem>;
    }}
  </ListType>
);

export default List;
