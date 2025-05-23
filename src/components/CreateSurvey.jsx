import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminForm = ({ onSave }) => {
  const [fields, setFields] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("USER"));
    if(!user || !user.isAdmin){
        localStorage.removeItem("USER");
        navigate("/login");
    }
},[])

  const addField = () => {
    setFields([...fields, { field: '', type: ''}]);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = fields.slice();
    newFields[index][field] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = fields.slice();
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const forms = JSON.parse(localStorage.getItem("FORMS"));
    localStorage.setItem("FORMS",JSON.stringify([...forms,[...fields]]));
    onSave(fields);
    navigate("/");
  };

  return (
    <div className="survey-container">
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="field-container">
            <p>{`Question: ${index+1}`}</p>
            <label>Field Name</label>
            <input
              type="text"
              value={field.field}
              onChange={(e) => handleFieldChange(index, 'field', e.target.value)}
            />
            <label>Type</label>
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
            >
              <option value="" disabled>Select</option>
              <option value="text">Text</option>
              <option value="rating">Rating</option>
              <option value="checkbox">Checkbox</option>
              <option value="textInput">Text Input</option>
            </select>
            <button type="button" onClick={() => removeField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type='button' className="add-button" disabled={fields.length<0} onClick={addField}>
          Add Field
        </button>
        <button type="submit" disabled={!fields.length>0}>Save Form</button>
      </form>
    </div>
  );
};

const CreateSurvey = () => {
  const handleSave = (fields) => {
    console.log('Saved Fields:', fields);
    // Here you can save the fields to the server or update the state in the parent component.
  };

  return (
    <div>
      <AdminForm onSave={handleSave} />
    </div>
  );
};

export default CreateSurvey;
