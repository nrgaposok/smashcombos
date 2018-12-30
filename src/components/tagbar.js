import React from "react";
import { Label, List } from "semantic-ui-react";

import { tagTypeToTag } from "../helpers";

export default function Tagbar({ tags }) {
  return (
    <List horizontal>
      <List.Item>
        <List.Header
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2rem"
          }}
        >
          Tags
        </List.Header>
      </List.Item>
      {(tags || []).map(tag => (
        <List.Item key={tag}>
          <Label>{tagTypeToTag[tag] || tag}</Label>
        </List.Item>
      ))}
    </List>
  );
}
