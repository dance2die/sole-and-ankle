import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === "default" ? null : variant === "new-release" ? (
            <NewReleaseLabel>Just released!</NewReleaseLabel>
          ) : (
            <SaleLabel>Sale</SaleLabel>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>${salePrice / 100}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;
const NewReleaseLabel = styled.span`
  position: absolute;
  top: 8px;
  right: -8px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  font-size: 0.8rem;
  padding: 8px;
  font-weight: ${WEIGHTS.bold};
`;

const SaleLabel = styled.span`
  position: absolute;
  top: 8px;
  right: -8px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 0.8rem;
  padding: 8px;
  font-weight: bold;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  width: 320px;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => (p.isOnSale ? "line-through" : "none")};
  color: ${(p) => (p.isOnSale ? COLORS.gray[700] : COLORS.gray[900])};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
