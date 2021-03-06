import React from "react";
import { graphql } from "gatsby";

import { Attributes, ComboList, Layout, Profile } from "../components";
import { getCharacter, getCharacterRender } from "../helpers";

export default function CharacterPage({ data, location: { search } }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, slug, description, attributes, combos, tags } = character;
  const {
    weight: { class: weightClass }
  } = attributes;

  return (
    <Layout>
      <Profile
        slug={slug}
        image={image}
        name={name}
        description={description}
        weightClass={weightClass}
        tags={tags}
        attributes={attributes}
      />
      <Attributes attributes={attributes} />
      <ComboList slug={slug} combos={combos} query={search} />
    </Layout>
  );
}

export const characterPageQuery = graphql`
  query CharacterPageQuery($id: String!) {
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
        uuid
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
