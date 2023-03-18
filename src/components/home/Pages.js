import PageTitle from './PageTitle';

export default function Pages() {
  return (
    <div className="pages">
      <PageTitle pageTitle={'images'} />
      <PageTitle pageTitle={'shop'} />
      <PageTitle pageTitle={'music'} />
      <PageTitle pageTitle={'about'} />
    </div>
  );
}
