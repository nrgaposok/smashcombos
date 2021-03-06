import React from "react";
import { Link } from "gatsby";
import { Segment, Button, Grid, Header, Icon } from "semantic-ui-react";

import { weightClassToTag } from "../helpers";
import * as styles from "../styles";
import CharacterPortrait from "./character-portrait";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";
import { fancyPanel } from "../styles";

export default function CharacterProfile({
  basic,
  slug,
  image,
  name,
  description,
  weightClass,
  tags
}) {
  return (
    <Grid
      style={{
        marginBottom: "2rem"
      }}
    >
      <Grid.Column mobile={16} tablet={16} computer={6} verticalAlign="bottom">
        <CharacterPortrait name={name} image={image} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={10} verticalAlign="bottom">
        <Segment basic>
          <Header as="h2" style={styles.fancyText}>
            Description
          </Header>
          {description && description !== "..." ? (
            <div
              style={{
                ...fancyPanel,
                maxWidth: "40rem",
                lineHeight: 1.6,
                fontSize: "1.2em"
              }}
            >
              {description}
            </div>
          ) : (
            <PlaceholderPanel>
              This character has no description.
            </PlaceholderPanel>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <Tagbar
              tags={[weightClassToTag[weightClass], ...tags]}
              style={{
                marginTop: "2rem"
              }}
            />
            {!basic && (
              <Grid.Column width={16}>
                <Link to={`/${slug}/edit`}>
                  <Button icon style={{ width: "8rem" }}>
                    <Icon name="cog" /> Edit Profile
                  </Button>
                </Link>
              </Grid.Column>
            )}
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
