import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Input, Form, message, Select } from 'antd';
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setSearchQuery,
  setFilterGroup,
} from '../store/studentSlice';

const { Option } = Select;

const Students = () => {
  const dispatch = useDispatch();
  const { students, loading, error, searchQuery, filterGroup } = useSelector((state) => state.students);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleAdd = () => {
    setCurrentStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id)).then(() => {
      message.success('Student deleted successfully');
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (currentStudent) {
        dispatch(updateStudent({ ...currentStudent, ...values })).then(() => {
          message.success('Student updated successfully');
          setIsModalVisible(false);
        });
      } else {
        dispatch(addStudent(values)).then(() => {
          message.success('Student added successfully');
          setIsModalVisible(false);
        });
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilterGroup = (value) => {
    dispatch(setFilterGroup(value));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearchQuery =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterGroup = filterGroup ? student.group === filterGroup : true;
    return matchesSearchQuery && matchesFilterGroup;
  });

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Group', dataIndex: 'group', key: 'group' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search by first or last name"
        value={searchQuery}
        onChange={handleSearch}
        style={{ width: 200, marginBottom: 16, marginRight: 16 }}
      />
      <Select
        placeholder="Filter by group"
        onChange={handleFilterGroup}
        allowClear
        style={{ width: 200, marginBottom: 16 }}
      >
        <Option value="A">A</Option>
        <Option value="B">B</Option>
      </Select>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Student
      </Button>
      <Table
        columns={columns}
        dataSource={filteredStudents}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={currentStudent ? 'Edit Student' : 'Add Student'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="studentForm">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: 'Please input the group!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
