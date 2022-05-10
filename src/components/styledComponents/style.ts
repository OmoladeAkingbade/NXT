import styled from 'styled-components';
import { variables } from './variable';

export const TableStyle = styled.table`
  width: 100%;

  border-collape: collapse;
  text-align: center;
  border-radius: ${variables.borderRadius};
  overflow: hidden;
`;
export const HeadStyle = styled.thead`
  position: sticky;
  z-index: 100;
  border: ${variables.border};
  margin-top: ${variables.mdSpacing};
`;
export const HeadTRStyle = styled.tr`
  background: ${variables.bg};
  margin-bottom: ;
`;
export const THStyle = styled.th`
  font: normal;
  padding: ${variables.mdSpacing};
  color: ${variables.text};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;

  :not(:last-of-type) {
    border-right: 1px solid ${variables.bg2};
  }
  ::first-of-type {
    width: 1%;
    white-space: nowrap;
  }
`;

export const BodyTRStyle = styled.tr`
  background: ${variables.white};
`;
export const TDStyle = styled.td`
  padding: ${variables.smSpacing};
  border: 1px solid ${variables.bg2};
  font-size: 14px;
`;
export const TFootStyle = styled.tfoot``;
export const FootTRStyle = styled.tr``;
export const FootTDStyle = styled.td``;

export const ButtonStyle = styled.button`
  background: green;
  padding: ${variables.smSpacing};
  border-radius: ${variables.borderRadius2};
`;

// export const SpanStyle = styled.span`
//   margin-bottom: ${variables.mdSpacing};
// `;
