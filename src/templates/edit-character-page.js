import React from "react";
import { Link, graphql } from "gatsby";
import { Tab } from "semantic-ui-react";

import {
  AddComboTab,
  CharacterPortrait,
  EditProfileTab,
  Layout
} from "../components";
import { getCharacter, getCharacterRender } from "../helpers";

export default function EditCharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const {
    name,
    slug,
    attributes: {
      weight: { class: weightClass }
    },
    description,
    tags
  } = character;

  return (
    <Layout>
      <Link to={slug}>
        <CharacterPortrait
          name={`Editing ${name}`}
          image={image}
          style={{
            marginBottom: "2rem"
          }}
        />
      </Link>
      <Tab
        panes={[
          {
            menuItem: {
              key: "editProfile",
              icon: "user",
              content: "Profile"
            },
            render: () => (
              <Tab.Pane>
                <EditProfileTab
                  slug={slug}
                  name={name}
                  image={image}
                  weightClass={weightClass}
                  description={description}
                  tags={tags}
                />
              </Tab.Pane>
            )
          },
          {
            menuItem: {
              key: "addCombo",
              icon: "plus",
              content: "Add Combo"
            },
            render: () => (
              <Tab.Pane>
                <AddComboTab />
              </Tab.Pane>
            )
          }
        ]}
        style={{
          marginBottom: "3rem"
        }}
      />
    </Layout>
  );
}

export const editCharacterPageQuery = graphql`
  query EditCharacterPageQuery($id: String!) {
    charactersJson(id: { eq: $id }) {
      name
      slug
      render {
        childImageSharp {
          fluid(maxWidth: 1075, quality: 72) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      tags
      attributes {
        airAcceleration {
          maxAdditional
          baseValue
          total
          rank
        }
        airSpeed {
          maxAirSpeed
          rank
        }
        fallSpeed {
          maxFallSpeed
          fastFallSpeed
          speedIncrease
          rank
        }
        runSpeed {
          maxRunSpeed
          rank
        }
        walkSpeed {
          maxWalkSpeed
          rank
        }
        weight {
          class
          rank
          value
        }
      }
      combos {
        input
        percentages {
          balloonweight
          featherweight
          lightweight
          middleweight
          heavyweight
          superheavyweight
        }
        damage
        demonstration
        tags
        notes
      }
    }
  }
`;
