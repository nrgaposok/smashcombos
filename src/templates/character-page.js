import React from "react";
import { graphql, Link } from "gatsby";

import { Button, CharacterStrip, Grouping, Layout, Panel } from "../components";
import "./character-page.scss";

const getCharacter = data => data.markdownRemark.frontmatter;

const getCharacterRender = character => character.render;

export default function CharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, attributes, killConfirms, combos } = character;
  const hasKillConfirms = killConfirms.length > 0;
  const hasCombos = combos.length > 0;

  return (
    <Layout>
      <section className="CharacterPage">
        <CharacterStrip
          name={name}
          image={image}
          attributes={attributes}
          killConfirms={killConfirms}
          combos={combos}
        />
        <Grouping title="Attributes">
          {attributes ? (
            Object.entries(attributes).map(([key, value]) => (
              <Grouping title={key}>
                {key === "weight" && (
                  <Panel>
                    <p>Class: {value.class}</p>
                    <p>Value: {value.value}</p>
                    <p>Rank: #{value.rank}</p>
                  </Panel>
                )}
              </Grouping>
            ))
          ) : (
            <Panel>This character has no listed attributes.</Panel>
          )}
        </Grouping>
        <Grouping title="Kill Confirms">
          {hasKillConfirms ? (
            killConfirms.map(
              ({
                input,
                balloonweightPercentage,
                featherweightPercentage,
                lightweightPercentage,
                middleweightPercentage,
                heavyweightPercentage,
                superHeavyweightPercentage
              }) => (
                <Panel key={input}>
                  <h2>{input}</h2>
                  <ul>
                    <li>Balloonweight - {balloonweightPercentage}</li>
                    <li>Featherweight - {featherweightPercentage}</li>
                    <li>Lightweight - {lightweightPercentage}</li>
                    <li>Middleweight - {middleweightPercentage}</li>
                    <li>Heavyweight - {heavyweightPercentage}</li>
                    <li>Super Heavyweight - {superHeavyweightPercentage}</li>
                  </ul>
                </Panel>
              )
            )
          ) : (
            <Panel>This character has no listed kill confirms.</Panel>
          )}
        </Grouping>
        <Grouping title="Combos">
          {hasCombos ? (
            combos.map(
              ({
                input,
                balloonweightPercentage,
                featherweightPercentage,
                lightweightPercentage,
                middleweightPercentage,
                heavyweightPercentage,
                superHeavyweightPercentage
              }) => (
                <Panel key={input}>
                  <h2>{input}</h2>
                  <ul>
                    <li>Balloonweight - {balloonweightPercentage}</li>
                    <li>Featherweight - {featherweightPercentage}</li>
                    <li>Lightweight - {lightweightPercentage}</li>
                    <li>Middleweight - {middleweightPercentage}</li>
                    <li>Heavyweight - {heavyweightPercentage}</li>
                    <li>Super Heavyweight - {superHeavyweightPercentage}</li>
                  </ul>
                </Panel>
              )
            )
          ) : (
            <Panel>This character has no listed combos.</Panel>
          )}
        </Grouping>
        <div className="CharacterPage-back">
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const characterPageQuery = graphql`
  query CharacterPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        name
        render {
          childImageSharp {
            fluid(maxWidth: 1075, quality: 72) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        attributes {
          weight {
            class
            rank
            value
          }
        }
        killConfirms {
          balloonweightPercentage
          featherweightPercentage
          heavyweightPercentage
          input
          lightweightPercentage
          middleweightPercentage
          superHeavyweightPercentage
        }
        combos {
          balloonweightPercentage
          featherweightPercentage
          heavyweightPercentage
          input
          lightweightPercentage
          middleweightPercentage
          superHeavyweightPercentage
        }
      }
    }
  }
`;
