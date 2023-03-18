import Page from './Page';

export default function Pages() {
  return (
    <div className="pages">
      <Page pageTitle={'images'} />
      <Page pageTitle={'shop'} />
      <Page pageTitle={'music'} />
      <Page pageTitle={'about'} />
    </div>
  );
}
