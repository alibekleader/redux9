import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers, addTeacher, updateTeacher, deleteTeacher } from '../store/teacherSlice';
import { Table, Button, Input, Select, Pagination, Modal, Form } from 'antd';

const { Option } = Select;

const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.teachers);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [levelFilter, setLevelFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    let data = teachers;

    // Filter by level
    if (levelFilter) {
      data = data.filter(teacher => teacher.level === levelFilter);
    }

    // Search by first name or last name
    if (searchTerm) {
      data = data.filter(teacher => 
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTeachers(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));
  }, [teachers, levelFilter, searchTerm, currentPage, pageSize]);

  const handleAddTeacher = (values) => {
    if (editingTeacher) {
      dispatch(updateTeacher({ ...editingTeacher, ...values }));
    } else {
      dispatch(addTeacher(values));
    }
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id) => {
    dispatch(deleteTeacher(id));
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Teacher
      </Button>
      <Select 
        placeholder="Filter by level" 
        onChange={value => setLevelFilter(value)} 
        style={{ width: 200, marginLeft: 10 }}
      >
        <Option value="">All Levels</Option>
        <Option value="Senior">Senior</Option>
        <Option value="Middle">Middle</Option>
        <Option value="Junior">Junior</Option>
      </Select>
      <Input 
        placeholder="Search by name" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        style={{ width: 200, marginLeft: 10 }}
      />
      <Table 
        dataSource={filteredTeachers} 
        columns={[
          { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
          { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
          { title: 'Level', dataIndex: 'level', key: 'level' },
          {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
              <span>
                <Button onClick={() => handleEditTeacher(record)}>Edit</Button>
                <Button onClick={() => handleDeleteTeacher(record.id)} style={{ marginLeft: 10 }}>
                  Delete
                </Button>
              </span>
            )
          }
        ]}
        pagination={false}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
      <Pagination 
        current={currentPage} 
        pageSize={pageSize} 
        total={teachers.length} 
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }} 
        style={{ marginTop: 20 }}
      />
      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingTeacher || { firstName: '', lastName: '', level: 'Senior' }}
          onFinish={handleAddTeacher}
        >
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input the last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="level" label="Level" rules={[{ required: true, message: 'Please select a level!' }]}>
            <Select>
              <Option value="Senior">Senior</Option>
              <Option value="Middle">Middle</Option>
              <Option value="Junior">Junior</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTeacher ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
