// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 9hA39KtYg3BevSMNGZjo8u
// Component: jvpz07dp-U
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";

import "@plasmicapp/react-web/lib/plasmic.css";
import * as defaultcss from "../plasmic__default_style.module.css"; // plasmic-import: global/defaultcss
import * as projectcss from "./plasmic_bbeats.module.css"; // plasmic-import: 9hA39KtYg3BevSMNGZjo8u/projectcss
import * as sty from "./PlasmicBrandCard.module.css"; // plasmic-import: jvpz07dp-U/css

export type PlasmicBrandCard__VariantMembers = {};

export type PlasmicBrandCard__VariantsArgs = {};
type VariantPropType = keyof PlasmicBrandCard__VariantsArgs;
export const PlasmicBrandCard__VariantProps = new Array<VariantPropType>();

export type PlasmicBrandCard__ArgsType = {
  brandImage?: React.ReactNode;
};

type ArgPropType = keyof PlasmicBrandCard__ArgsType;
export const PlasmicBrandCard__ArgProps = new Array<ArgPropType>("brandImage");

export type PlasmicBrandCard__OverridesType = {
  root?: p.Flex<"div">;
  img?: p.Flex<"img">;
};

export interface DefaultBrandCardProps {
  brandImage?: React.ReactNode;
  className?: string;
}

function PlasmicBrandCard__RenderFunc(props: {
  variants: PlasmicBrandCard__VariantsArgs;
  args: PlasmicBrandCard__ArgsType;
  overrides: PlasmicBrandCard__OverridesType;
  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;

  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(defaultcss.all, projectcss.root_reset, sty.root)}
    >
      <p.PlasmicSlot
        defaultContents={
          <img
            data-plasmic-name={"img"}
            data-plasmic-override={overrides.img}
            alt={""}
            className={classNames(defaultcss.img, sty.img)}
            role={"img"}
          />
        }
        value={args.brandImage}
      />
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "img"],
  img: ["img"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<
  T extends NodeNameType
> = typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  img: "img";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicBrandCard__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> = { // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicBrandCard__VariantsArgs;
  args?: PlasmicBrandCard__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicBrandCard__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicBrandCard__ArgsType, ReservedPropsType> &
  // Specify overrides for each element directly as props
  Omit<
    NodeOverridesType<T>,
    ReservedPropsType | VariantPropType | ArgPropType
  > &
  // Specify props for the root element
  Omit<
    Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
    ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
  >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicBrandCard__ArgProps,
      internalVariantPropNames: PlasmicBrandCard__VariantProps
    });

    return PlasmicBrandCard__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicBrandCard";
  } else {
    func.displayName = `PlasmicBrandCard.${nodeName}`;
  }
  return func;
}

export const PlasmicBrandCard = Object.assign(
  // Top-level PlasmicBrandCard renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    img: makeNodeComponent("img"),

    // Metadata about props expected for PlasmicBrandCard
    internalVariantProps: PlasmicBrandCard__VariantProps,
    internalArgProps: PlasmicBrandCard__ArgProps
  }
);

export default PlasmicBrandCard;
/* prettier-ignore-end */
