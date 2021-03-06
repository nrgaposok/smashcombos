import React, { Component } from "react";
import { Button, Form, Grid, Input, Segment } from "semantic-ui-react";

import * as styles from "../../styles";
import { InputScreen } from "./components";
import { comboTags, comboPercentages } from "./constants";

export default class ComboCreator extends Component {
  static defaultProps = {
    onSubmit: values => console.log(values)
  };

  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    input: this.props.input || "",
    damage: this.props.damage || "0",
    tags: comboTags.reduce((prev, { value }) => {
      prev[value] = (this.props.tags || []).includes(value);
      return prev;
    }, {}),
    percentages:
      this.props.percentages ||
      comboPercentages.reduce((prev, { value }) => {
        prev[value] = "0";
        return prev;
      }, {}),
    demonstration: this.props.demonstration || "",
    notes: this.props.notes || ""
  });

  updateInput = input => this.setState({ input });

  updateDamage = (_, { value: damage }) => this.setState({ damage });

  updateTags = tag => (_, { checked }) =>
    this.setState(prevState => ({
      tags: {
        ...prevState.tags,
        [tag]: checked
      }
    }));

  updatePercentages = weightClass => (_, { value: percentage }) =>
    this.setState(prevState => ({
      percentages: {
        ...prevState.percentages,
        [weightClass]: percentage
      }
    }));

  updateDemonstration = (_, { value: demonstration }) =>
    this.setState({ demonstration });

  updateNotes = (_, { value: notes }) => this.setState({ notes });

  reset = () => this.setState(this.getInitialState());

  handleSubmit = () => {
    const { onSubmit } = this.props;

    onSubmit({
      ...this.state,
      tags: Object.entries(this.state.tags)
        .map(([key, value]) => value && key)
        .filter(Boolean)
    });
  };

  render() {
    const {
      input,
      damage,
      tags,
      percentages,
      demonstration,
      notes
    } = this.state;

    return (
      <Segment basic>
        <InputScreen input={input} update={this.updateInput} />
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Field>
                <label>Damage Dealt</label>
                <p
                  style={{
                    ...styles.fancyPanel,
                    marginTop: "1rem",
                    marginBottom: "2rem"
                  }}
                >
                  How much damage does the combo do to the opponent?
                </p>
                <Input
                  icon="percent"
                  value={damage}
                  onChange={this.updateDamage}
                  tabIndex={1}
                  style={{
                    maxWidth: "10rem"
                  }}
                />
              </Form.Field>
              <Form.Group grouped>
                <label>Tags</label>
                {comboTags.map(({ label, value }, index) => (
                  <Form.Checkbox
                    key={label}
                    label={label}
                    checked={tags[value]}
                    onChange={this.updateTags(value)}
                    tabIndex={index + 2}
                  />
                ))}
              </Form.Group>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <p
                style={{
                  ...styles.fancyPanel,
                  marginTop: "1rem",
                  marginBottom: "2rem"
                }}
              >
                At what percentage ranges does the combo work?
              </p>
              <div
                style={{
                  display: "flex"
                }}
              >
                <div style={{ marginRight: "1rem" }}>
                  {comboPercentages.map(
                    ({ label, value }, index) =>
                      index < 3 && (
                        <Form.Input
                          key={label}
                          label={label}
                          icon="percent"
                          value={percentages[value]}
                          onChange={this.updatePercentages(value)}
                          tabIndex={1 + comboTags.length + index + 1}
                          style={{
                            maxWidth: "10rem",
                            marginBottom: index !== 2 ? "1rem" : 0
                          }}
                        />
                      )
                  )}
                </div>
                <div>
                  {comboPercentages.map(
                    ({ label, value }, index) =>
                      index > 2 && (
                        <Form.Input
                          key={label}
                          label={label}
                          icon="percent"
                          value={percentages[value]}
                          onChange={this.updatePercentages(value)}
                          tabIndex={1 + comboTags.length + index + 3}
                          style={{
                            maxWidth: "10rem",
                            marginBottom: index !== 5 ? "1rem" : 0
                          }}
                        />
                      )
                  )}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Form.Group
                grouped
                style={{
                  maxWidth: "450px"
                }}
              >
                <Form.Input
                  label="Demonstration"
                  icon="video"
                  value={demonstration}
                  onChange={this.updateDemonstration}
                  tabIndex={1 + comboTags.length + comboPercentages.length + 2}
                />
                <Form.TextArea
                  label="Notes"
                  value={notes}
                  onChange={this.updateNotes}
                  tabIndex={1 + comboTags.length + comboPercentages.length + 3}
                />
              </Form.Group>
              <Form.Field
                style={{
                  maxWidth: "450px"
                }}
              >
                <Button.Group
                  widths={2}
                  style={{
                    alignSelf: "flex-end"
                  }}
                >
                  <Button type="button" onClick={this.reset}>
                    Reset
                  </Button>
                  <Button type="submit" primary>
                    Confirm
                  </Button>
                </Button.Group>
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    );
  }
}
