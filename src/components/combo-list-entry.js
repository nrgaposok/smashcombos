import React, { Component } from "react";
import {
  Button,
  Segment,
  Header,
  Label,
  Embed,
  Grid,
  List
} from "semantic-ui-react";

import { generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import Input from "./input";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default class ComboListEntry extends Component {
  state = {
    isVisible: true
  };

  toggleVisibility = () =>
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));

  render() {
    const {
      index,
      input,
      damage,
      diable,
      killConfirm,
      percentages,
      demonstration,
      tags,
      notes,
      total
    } = this.props;
    const { isVisible } = this.state;
    const allTags = [
      ...(killConfirm ? ["Kill Confirm"] : []),
      `${diable ? "" : "Not"} DI-able`,
      ...(tags || [])
    ];

    return (
      <Segment
        key={input}
        basic
        style={{
          ...styles.noSidePadding,
          position: "relative",
          borderBottom: index === total ? "" : "1px solid #7289D8"
        }}
      >
        <Button
          icon
          onClick={this.toggleVisibility}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 2,
            width: "8rem"
          }}
        >
          {isVisible ? "Hide" : "Show"}
        </Button>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={3}>
            <Segment basic>
              <Input input={input} />
              {damage != null && isVisible && (
                <Label style={{ marginTop: "2rem" }}>
                  {damage}%
                  <Label.Detail
                    style={{
                      textTransform: "uppercase"
                    }}
                  >
                    damage
                  </Label.Detail>
                </Label>
              )}
            </Segment>
          </Grid.Column>
          {isVisible && (
            <Grid.Column mobile={16} tablet={16} computer={13}>
              <Segment basic>
                <Tagbar tags={allTags} />
              </Segment>
              <Segment basic>
                <Header as="h3" style={styles.fancyText}>
                  Percentages
                </Header>
                <List
                  horizontal
                  celled
                  style={{
                    display: "flex",
                    flexWrap: "wrap"
                  }}
                >
                  {generateEffectivePercentages(percentages).map(
                    ({ label, value }) => (
                      <List.Item
                        key={label}
                        style={{
                          flex: label === "Super Heavyweight" ? 2 : 1,
                          maxWidth: "12rem",
                          marginBottom: "0.2rem"
                        }}
                      >
                        <List.Header
                          as="h4"
                          style={{
                            whiteSpace: "nowrap"
                          }}
                        >
                          {label}
                        </List.Header>
                        <List.Content>{value}</List.Content>
                      </List.Item>
                    )
                  )}
                </List>
              </Segment>
              <Segment
                basic
                style={{
                  maxWidth: "40rem"
                }}
              >
                <Header as="h3" style={styles.fancyText}>
                  Demonstration
                </Header>
                {demonstration ? (
                  <Embed url={demonstration} />
                ) : (
                  <PlaceholderPanel action="Upload demonstration">
                    This combo does not have a demonstration.
                  </PlaceholderPanel>
                )}
              </Segment>
              <Segment basic>
                <Header as="h3" style={styles.fancyText}>
                  Notes
                </Header>
                {notes || "There are no notes on this combo."}
              </Segment>
            </Grid.Column>
          )}
        </Grid>
      </Segment>
    );
  }
}