import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";
import ProductContainer from "@/components/products/ProductContainer";

export default function Products({ data }) {
  return (
    <>
      <GeneralLayout title="Products - MeierCommerce">
        <Authorized>
          <ProductContainer data={data} />
        </Authorized>
      </GeneralLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let page = context.query.page;
  let limit = context.query.limit;
  let sort = context.query.sort;
  let query = context.query.query;

  let url = `${process.env.DOMAIN_API_URL}/api/products`;

  if (page || limit || sort || query) {
    url += "?";
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sort) url += `sort=${sort}&`;
    if (query) url += `query=${query}&`;
  }
  const data = await fetch(url)
    .then((res) => res.json())
    .then((res) => res);

  return {
    props: {
      data: data,
    },
  };
}
