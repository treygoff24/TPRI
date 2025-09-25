import type { ExpressionSpecification } from "maplibre-gl";

import type { RecognitionDataset, StyleTokens } from "./types";

export function buildColorExpression(
  data: RecognitionDataset,
  tokens: StyleTokens["colors"],
): ExpressionSpecification {
  const expression: unknown[] = ["match", ["get", "iso_a3"]];

  const china: string[] = [];
  const taiwan: string[] = [];

  data.entries.forEach((entry) => {
    if (entry.recognition === "china") {
      china.push(entry.isoAlpha3);
    } else {
      taiwan.push(entry.isoAlpha3);
    }
  });

  if (china.length) {
    expression.push(china, tokens.china);
  }
  if (taiwan.length) {
    expression.push(taiwan, tokens.taiwan);
  }
  expression.push(tokens.neutral);

  return expression as ExpressionSpecification;
}
