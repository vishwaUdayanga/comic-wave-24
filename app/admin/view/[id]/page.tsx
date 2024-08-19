export default async function View({ params }: { params: { id: string } }) {
    const { id } = params;
  
    return (
      <div>
        <h1>Details Page</h1>
        <p>ID: {id}</p>
      </div>
    );
}

