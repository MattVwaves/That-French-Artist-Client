export default function Page({ pageTitle }) {
  return (
    <>
      <img
        src={require(`../../assets/home/${pageTitle}.png`)}
        height="100px"
        alt="page"
      />
      <h2 id={pageTitle}>{pageTitle}</h2>
    </>
  );
}
