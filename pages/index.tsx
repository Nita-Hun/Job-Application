// pages/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import styles from '../styles/Home.module.css';

interface FormData {
  dateofapplication: string;
  position: string;
  fullname: string;
  nationality: string;
  address: string;
  phonenumber: string;
  email: string;
  DOB: string;
  drivinglicense: string;
  employmenttype: string;
  yearsofwork: string;
  maritalstatus: string;
}

const JobApplication: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    dateofapplication: '',
    position: '',
    fullname: '',
    nationality: '',
    address: '',
    phonenumber: '',
    email: '',
    DOB: '',
    drivinglicense: '',
    employmenttype: '',
    yearsofwork: '',
    maritalstatus: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const formRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('/api/form-data');
        setFormData(response.data || formData); // Handle case when response data is null
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/form-data', formData);
      alert('Data saved successfully');
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading form data: {error}</p>;
  }

  
  return (
    <div className={styles.container}>
      <form ref={formRef} onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-center font-extrabold text-4xl leading-tight text-gray-900">Job Application Form</h1>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
              <label htmlFor="dateofapplication" className="block text-sm font-medium leading-6 text-gray-900">
                Date of Application
              </label>
              <div className="mt-2 ml-2">
                <input
                  id="dateofapplication"
                  name="dateofapplication"
                  type="text"
                  value={formData.dateofapplication}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                Position
              </label>
              <div className="mt-2">
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="employmenttype" className="block text-sm font-medium leading-6 text-gray-900">
                Employment Type
              </label>
              <div className="mt-2">
                <input
                  id="employmenttype"
                  name="employmenttype"
                  value={formData.employmenttype}
                  onChange={handleChange}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                </input>
              </div>
            </div>
            </div>
           <br />
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                Nationality
              </label>
              <div className="mt-2">
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="DOB" className="block text-sm font-medium leading-6 text-gray-900">
                DoB
              </label>
              <div className="mt-2">
                <input
                  id="DOB"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                </input>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
              <label htmlFor="yearsofwork" className="block text-sm font-medium leading-6 text-gray-900">
                Years of Work
              </label>
              <div className="mt-2">
                <input
                  id="yearsofwork"
                  name="yearsofwork"
                  type="text"
                  value={formData.yearsofwork}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="mt-10 col-span-4">
              <fieldset>
              <legend className="mt-3 text-sm font-semibold leading-6 text-gray-900">Driving License</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="drivinglicese"
                    name="drivinglicense"
                    type="radio"
                    value={formData.drivinglicense}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="drivinglicense" className="block text-sm font-medium leading-6 text-gray-900">
                    NO
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="drivinglicense"
                    name="drivinglicense"
                    type="radio"
                    value={formData.drivinglicense}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="drivinglicense" className="block text-sm font-medium leading-6 text-gray-900">
                    YES
                  </label>
                </div>
              </div>
              <legend className="mt-5 text-sm font-semibold leading-6 text-gray-900">Marital Status</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="maritalstatus"
                    name="maritalstatus"
                    type="radio"
                    value={formData.maritalstatus}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="maritalstatus" className="block text-sm font-medium leading-6 text-gray-900">
                    Single
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="maritalstatus"
                    name="maritalstatus"
                    type="radio"
                    value={formData.maritalstatus}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="maritalstatus" className="block text-sm font-medium leading-6 text-gray-900">
                    Married, number of dependent(s)
                  </label>
                </div>
              </div>
            </fieldset>
            
          </div>
        </div>
        </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" className="text-sm font-semibold leading-6 text-gray-900">
          Save
        </button>
        <button
          type="button" onClick={handlePrint}
          className="rounded-md bg-indigo-600 px-3 py-2 pl-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Export to PDF
        </button>
      </div>
    </form>   
    </div>
  );
};

export default JobApplication;




