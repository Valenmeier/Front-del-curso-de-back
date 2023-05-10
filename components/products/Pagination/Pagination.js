import Styles from "./pagination.module.css";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { actualizarPagina } from "@/utils/funcionActualizaLinks";
import { useRouter } from "next/router";

const Pagination = ({
  page,
  totalPages,
  prevLink,
  nextLink,
}) => {
  const router = useRouter();
  const url = router.asPath;
  const renderLink = (condition, action, title, IconComponent) => {
    const newUrl = actualizarPagina(totalPages, action, url);
    return (
      <div>
        {condition && newUrl && (
          <Link href={newUrl} title={title}>
            <IconComponent />
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      {renderLink(prevLink !== null, "first", "First page", BiFirstPage)}
      {renderLink(
        prevLink !== null,
        "anterior",
        "Last page",
        AiOutlineArrowLeft
      )}
      <div>
        <h2 title="Actual page">{page}</h2>
      </div>
      {renderLink(
        nextLink !== null,
        "siguiente",
        "Next page",
        AiOutlineArrowRight
      )}
      {renderLink(nextLink !== null, "ultimate", "Last page", BiLastPage)}
    </div>
  );
};

export default Pagination;
