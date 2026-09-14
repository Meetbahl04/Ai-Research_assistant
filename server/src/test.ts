import { getEmbedding }
from "./utils/embeddings.utils.js";

const run = async () => {

  const embedding =
    await getEmbedding(
      "Transformers are powerful models"
    );

  console.log(
    embedding.length
  );

  console.log(
    embedding.slice(0, 10)
  );
};

run();