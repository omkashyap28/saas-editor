import EditorPanel from "./_components/editor-panel";
import Header from "./_components/header";
import OutputPanel from "./_components/output-panel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-450 mx-auto p-4">
        <Header />
        <div className="grid gri-dols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
