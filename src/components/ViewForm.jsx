import React from 'react';

const Table = ({ data }) => {
  // Function to render rows for responses under each id
  const renderRows = (responses) => {
    return responses.map((response, index) => (
      <tr key={index}>
        <td>{response.Name}</td>
        <td>{response.Rating}</td>
        <td>{response.Satisfactory?.toString()}</td>
        <td>{response.Note}</td>
      </tr>
    ));
  };

  // Function to render rows grouped by id
  const renderGroupedRows = () => {
    return data.map((item) => (
      <tbody key={item.id}>
        <tr>
          <th colSpan={4}>Survey Form {item.id+1}</th>
        </tr>
        {renderRows(item.responses)}
      </tbody>
    ));
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Satisfactory</th>
          <th>Note</th>
        </tr>
      </thead>
      {renderGroupedRows()}
    </table>
  );
};


const ViewForm = () => {
    const data = JSON.parse(localStorage.getItem("RESPONSES"));
    if(!data.length) return <p>No Responses</p>;
    return(
        <div>
            <h3>All Survey Responses</h3>
            <Table data={data} />
        </div>
    )
};

export default ViewForm;

