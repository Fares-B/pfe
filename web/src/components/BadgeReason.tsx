import styled from "styled-components";

export const REASON_LIST = [
  "other",
  "spam",
  "harassment",
  "offensive",
  "fake",
  "inappropriate",
  "unwanted",
  "duplicate",
  "wrong",
  "inaccurate",
  "irrelevant",
  "outdated",
  "incomplete",
];

enum ENUM_REASON {
  other = "other",
  spam = "spam",
  harassment = "harassment",
  offensive = "offensive",
  fake = "fake",
  inappropriate = "inappropriate",
  unwanted = "unwanted",
  duplicate = "duplicate",
  wrong = "wrong",
  inaccurate = "inaccurate",
  irrelevant = "irrelevant",
  outdated = "outdated",
  incomplete = "incomplete",
}
const REASON_COLOR = {
  other: "#000",
  spam: "#f44336",
  harassment: "#f44336",
  offensive: "#f44336",
  fake: "#f44336",
  inappropriate: "#f44336",
  unwanted: "#f44336",
  duplicate: "#f44336",
  wrong: "#f44336",
  inaccurate: "#f44336",
  irrelevant: "#f44336",
  outdated: "#f44336",
  incomplete: "#f44336",
};

interface IReasonProps {
  reason: ENUM_REASON;
}

const BadgeReason = styled.span<IReasonProps>`
  background-color: ${({ reason }) => REASON_COLOR[reason]};
  color: #fff;
  font-size: 1em;
  font-weight: 600;

  border-radius: 5px;
  padding: 3px 15px;
  width: auto;
  margin: 0.5em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

export default BadgeReason;
