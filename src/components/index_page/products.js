import React, { Component } from "react";
import { ProjectBox } from "../../../unused/projects";
import SectionTitle from "../section_title";
import { StaticQuery, Link } from "gatsby";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

export class ProductBox extends Component {
  render() {
    let product = this.props.product;
    return (
        <div className="col-lg-4 col-md-4">
          <Card className="feature_item">
          <CardImg top width="100%" src={`${product.preview_img}`} />
          <CardBody>
            <CardTitle tag="h4">{product.title}</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">{product.subtitle}</CardSubtitle>
            <CardText>{product.description}</CardText>
            <br/>
            <Button tag={Link} href={product.url} target="_blank">{product.button_text || "Read More"}</Button>

          </CardBody>
          
        </Card>
      </div>
    );
  }
}

export default class ProductArea extends Component {
  render() {
    return (
      <section className="feature_area p_120" id="services">
        <SectionTitle
          title="Products"
          sub_title="When life gives you lemons, you make products off that experience."
        />
        <div className="container">
          <div className="feature_inner row"> 
          <StaticQuery
                                    query={graphql`
                                    query {
                                      allMarkdownRemark(
                                        filter: {fields: {sourceName: {eq: "products"}}, 
                                          frontmatter: {draft: {eq: false}}}) {
                                        edges {
                                          node {
                                            fields{
                                              sourceName
                                            }
                                            timeToRead
                                            frontmatter {
                                              title
                                              description
                                              slug
                                              subtitle
                                              skills
                                              button_text
                                              preview_img
                                              url
                                            }
                                          }
                                        }
                                      }
                                    }
                                    `}
                                    render={data => (
                                        data.allMarkdownRemark.edges.map(edge => (
                                            <ProductBox product={{...edge.node.frontmatter, ...edge.node.fields}} key={edge.node.fields.slug} />
                                        )) 
                                    )}
                                          />
          </div>
        </div>
      </section>
    );
  }
}
