export const actualizarPagina = (totalPages, accion, url) => {
  const urlObj = new URL(url, "http://example.com");
  const queryParams = new URLSearchParams(urlObj.search);

  let pagActual = queryParams.has("page") ? parseInt(queryParams.get("page")) : 1;

  switch (accion) {
    case "siguiente":
      if (pagActual < totalPages) pagActual++;
      break;
    case "anterior":
      if (pagActual > 1) pagActual--;
      break;
    case "ultimate":
      pagActual = totalPages;
      break;
    case "first":
      pagActual = 1;
      break;
  }

  queryParams.set("page", pagActual);

  const nuevoUrl = `${urlObj.pathname}?${queryParams.toString()}`;

  if (nuevoUrl !== urlObj.search) {
    return nuevoUrl;
  } else {
    return null;
  }
};
