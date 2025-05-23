import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormData } from './API';

const Survey = ({ surveyConfig, formId }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("USER"))){
        localStorage.removeItem("USER");
        navigate("/login");
    }
},[])

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let responsesData = JSON.parse(localStorage.getItem("RESPONSES"));
    if(responsesData){
      if(responsesData[formId]){
        responsesData[formId].responses = [
          ...responsesData[formId].responses,
          formData
        ];
      }else{
        responsesData[formId] = {id:formId, responses:[] };
        responsesData[formId].responses = [
          formData
        ];
      }
    }
    localStorage.setItem("RESPONSES", JSON.stringify(responsesData));
    navigate("/");
  }

  const renderField = (fieldConfig) => {
    const { field, type } = fieldConfig;

    switch (type) {
      case 'rating':
        return (
          <div key={field} className='mb-16'>
            <label>{field}</label>
            <input
              type="number"
              min={1}
              max={5}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        );
      case 'text':
        return (
          <div key={field} className='mb-16'>
            <label>{field}</label>
            <input
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div key={field} className='mb-16'>
            <label>{field}</label>
            <input
              type="checkbox"
              checked={formData[field] || false}
              onChange={(e) => handleChange(field, e.target.checked)}
            />
          </div>
        );
      case 'textInput':
        return (
          <div key={field} className='mb-16'>
            <label>{field}</label>
            <textarea
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      {surveyConfig.map((fieldConfig) => renderField(fieldConfig))}
      <button type="submit">Submit</button>
    </form>
  );
};


const Form = () => {
  const {id} = useParams();
  const surveyConfig = getFormData(id);
  return (
    <div>
      <h1>Survey</h1>
      <Survey surveyConfig={surveyConfig} formId={id-1}/>
    </div>
  );
};

export default Form;
