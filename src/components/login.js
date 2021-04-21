import React, { Component } from 'react'
import { Form, Input, Button, Row, message, Table, Popconfirm, Col, Icon, Upload, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import ExcelPage from "./excelPage";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/editable";
import ExportJsonExcel from 'js-export-excel';
import swal from 'sweetalert';

const { Text } = Typography;
export default class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            user1: '',
            password1: '',
            cols: [],
            rows: [],
            show: false,
            save: true,
            name: null,
            checkerror: false,
            errorMessage: null,
            columns: [
                {
                    title: "ICD-10",
                    dataIndex: "ICD_10",
                    // editable: true,
                    render: text => this.icd_10.includes(text) ? text : <Text type="danger">{text}</Text>
                },
                {
                    title: "ICD-9",
                    dataIndex: "ICD_9",
                    // editable: true
                    render: textg => this.icd_9.includes(textg) ? textg : <Text type="danger">{textg}</Text>
                },
                {
                    title: "รหัสกรมบัญชีกลาง.",
                    dataIndex: "g1",
                    // editable: true
                },
                {
                    title: "อุปกรณ์",
                    dataIndex: "g2",
                    // editable: true
                },
                {
                    title: "อัตราจ่าย",
                    dataIndex: "g3",
                    // editable: true
                },
                // {
                //   title: "Action",
                //   dataIndex: "action",
                //   render: (text, record) =>
                //     this.state.rows.length >= 1 ? (
                //       <Popconfirm
                //         title="Sure to delete?"
                //         onConfirm={() => this.handleDelete(record.key)}
                //       >
                //         <Icon
                //           type="delete"
                //           theme="filled"
                //           style={{ color: "red", fontSize: "20px" }}
                //         />
                //       </Popconfirm>
                //     ) : null
                // }
            ]
        };

        this.checktext = ''
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.router = undefined;

        this.itemmm = {
            '2505': "เครื่องช่วยฟังแบบกล่อง",
            '2507': 'เครื่องช่วยฟังแบบทัดหลังใบหู',
            '2508': 'เครื่องช่วยฟังแบบใส่ในช่องหู',
            '8101': 'แขนเทียมต่ำกว่าระดับศอกส่วนปลายชนิดห้านิ้ว',
            '8105': 'แขนเทียมเหนือศอกส่วนปลายชนิดตะขอโลหะข้อศอกล็อกได้ด้วยมือ',
            '8106': 'แขนเทียมชิดไหล่หรือแนบไหล่ส่วนปลายชนิดห้านิ้วไม่มีระบบใช้งานข้อศอกล็อกได้ด้วยมือ',
            '8202': 'ขาเทียมระดับใต้เข่าแกนนอก',
            '8203': 'ขาเทียมระดับใต้เข่าแกนใน',
            '8206': 'ขาเทียมระดับเหนือเข่าแกนใน',
            '8801': 'รองเท้าคนพิการขนาดเล็ก ชนิดตัดเฉพาะราย',
            '8802': 'รองเท้าคนพิการขนาดกลาง ชนิดตัดเฉพาะราย',
            '8803': 'รองเท้าคนพิการขนาดใหญ่ชนิดตัดเฉพาะราย',
            '8804': 'รองเท้าคนพิการขนาดใหญ่พิเศษ ชนิดตัดเฉพาะราย',
            '2006': 'เลนส์แก้วตาเทียม ชนิดพับได้ (foldable intraocular lens)',
            '2007': 'เลนส์แก้วตาเทียม ชนิดแข็งพับไม่ได้ (unfoldable intraocular lens)',
            '8201': 'ขาเทียมระดับข้อเท้า',
            '8221': 'เบ้าขาเทียมระดับสะโพก',
            '8205': 'ขาเทียมระดับเหนือเข่าแกนนอก',
        }

        this.icd_10 = ['H901', 'H902', 'H904', 'H905', 'H907', 'H908',
            'H910', 'H911', 'H912', 'H913', 'H918', 'H919', 'S684 , V5259',
            'S489 , V3049', 'S489 , V2349', 'S881 , W1499', 'S881 , W1399',
            'S789 , V3359', 'H250 , H546', 'H259 , H544', 'H259 , H544',
            'H252 , H546', 'S980 , V2349', 'M160', 'M161', 'M162', 'M163', 'M164', 'M165',
            'M166', 'M167', 'Z461', 'M201', 'M202', 'M203', 'M204', 'M205', 'M206', 'M207',
            'M208', 'M209', 'M215', 'M216'];

        this.check = ['Z461', 'M201', 'M202', 'M203', 'M204', 'M205', 'M206', 'M207',
            'M208', 'M209', 'M215', 'M216']

        this.icd_9 = [9548, 2099, 8442, 8441, 8415, 8446, 8445, 1371, 1372, 8447,
            '8151 , 8445', '8161 , 8445'];
    }
    handleChange1(event) {
        this.setState({ user: event.target.value });
    }
    handleChange2(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit1() {
        if (this.state.user == 'admin' && this.state.password == "2107") {
            this.setState({ user1: this.state.user });
            this.setState({ password1: this.state.password })
            //    window.history.pushState('', '', './home'); 
            // window.location = '/home'
        } else {
            message.error('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง');
        }

        // alert('A name was submitted: ' + this.state.user + "  " + this.state.password);
        // event.preventDefault();
    }



    error = () => {
        message.error('ข้อมูลผิดผลาด');
    };

    handleSave = row => {
        var dict = {
            '2505': "เครื่องละ 9,000 บาท",
            '2507': 'ข้างละ 12,000 บาท',
            '2508': 'ข้างละ 12,500 บาท',
            '8101': 'ข้างละ 36,500 บาท',
            '8105': 'ข้างละ 48,000 บาท',
            '8106': 'ข้างละ 38,000 บาท',
            '8202': 'ข้างละ 6,000 บาท',
            '8203': 'ข้างละ 12,000 บาท',
            '8206': 'ข้างละ 28,000 บาท',
            '8801': 'คู่ละ 800 บาท',
            '8802': 'คู่ละ 1,000 บาท',
            '8803': 'คู่ละ 1,200 บาท',
            '8804': 'คู่ละ 1,400 บาท',
            '2006': 'อันละ 2,800 บาท',
            '2007': 'อันละ 700 บาท',
            '8201': 'ข้างละ 11,000 บาท',
            '8221': 'ข้างละ 6,000 บาท',
            '8205': 'ข้างละ 26,000 บาท',
        };
        const newData = [...this.state.rows];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        // console.log(item.includes(undefined))
        this.setState({ rows: newData });
        if (newData[index]['ICD_10'] && newData[index]['ICD_9'] && newData[index]['g1'] && newData[index]['g2'] !== undefined) {
            let temporaryarray = newData.slice();
            temporaryarray[index]['g3'] = dict[newData[index]['g1']];
            this.setState(temporaryarray);
        }
    };

    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = fileList => {
        this.setState({ save: true })
        this.setState({checkerror: false})
        this.checktext = ''
        // console.log("fileList", fileList);
        this.setState({ name: fileList.name.split(".")[0] });
        let fileObj = fileList;
        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!"
            });
            return false;
        }
        console.log("fileObj.type:", fileObj.type);
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "Unknown file format. Only Excel files are uploaded!"
            });
            return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                var dict = {
                    '2505': "เครื่องละ 9,000 บาท",
                    '2507': 'ข้างละ 12,000 บาท',
                    '2508': 'ข้างละ 12,500 บาท',
                    '8101': 'ข้างละ 36,500 บาท',
                    '8105': 'ข้างละ 48,000 บาท',
                    '8106': 'ข้างละ 38,000 บาท',
                    '8202': 'ข้างละ 6,000 บาท',
                    '8203': 'ข้างละ 12,000 บาท',
                    '8206': 'ข้างละ 28,000 บาท',
                    '8801': 'คู่ละ 800 บาท',
                    '8802': 'คู่ละ 1,000 บาท',
                    '8803': 'คู่ละ 1,200 บาท',
                    '8804': 'คู่ละ 1,400 บาท',
                    '2006': 'อันละ 2,800 บาท',
                    '2007': 'อันละ 700 บาท',
                    '8201': 'ข้างละ 11,000 บาท',
                    '8221': 'ข้างละ 6,000 บาท',
                    '8205': 'ข้างละ 26,000 บาท',
                };
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {

                        if (row[0] !== undefined) {
                            if (!this.icd_10.includes(row[0])) {
                                this.setState({ save: false })
                            }
                        }
                        if (row[1] !== undefined) {
                            if (!this.icd_9.includes(row[1])) {
                                this.setState({ save: false })
                            }
                        }

                        if (this.check.includes(row[0]) && row[1] !== undefined) {
                            this.checktext += row[0]+" "
                            this.setState({checkerror: true})
                            console.log("ddddddddddddddddd")


                        }
                        newRows.push({
                            key: index,
                            // ICD_10: <Text type="danger">{row[0]}</Text>,
                            // ICD_9: <Text type="danger">{row[1]}</Text>,
                            // g1: <Text type="danger">{row[2]}</Text>,
                            // g2: <Text type="danger">{row[3]}</Text>,
                            // g3: <Text type="danger">{dict[row[2]]}</Text>
                            // g3: dict[row[3]]
                            ICD_10: row[0],
                            ICD_9: row[1],
                            g1: row[2],
                            g2: this.itemmm[row[2]],
                            g3: dict[row[2]]
                        });

                    }
                });
                if (newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!"
                    });
                    return false;
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null
                    });
                }
            }
        });
        return false;
    };

    handleSubmit = async () => {
        // console.log("submitting: ", this.state.rows);
        const data = this.state.rows ? this.state.rows : '';//tabular data
        var option = {};
        let dataTable = [];
        let datas = []
        if (data) {

            data.map((row) => {
                datas.push(
                    row['g3']
                )
                let obj = {
                    'ICD-10': row['ICD_10'],
                    'ICD-9': row['ICD_9'],
                    'รหัสกรมบัญชีกลาง.': row['g1'],
                    'อุปกรณ์': row['g2'],
                    'อัตราจ่าย': row['g3'],
                }
                dataTable.push(obj);
            });
            // for (let i in data) {
            //   if(data){
            //     let obj = {
            //                  'Organization ID': data[i].id,
            //                  'Organization code': data[i].organization_code,
            //                  'Organization name': data[i].organization_name,
            //     }
            //     dataTable.push(obj);
            //   }
            // }
        }
        option.fileName = this.state.name;
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: 'sheet',
                sheetFilter: ['ICD-10', 'ICD-9', 'รหัสกรมบัญชีกลาง.', 'อุปกรณ์', 'อัตราจ่าย'],
                sheetHeader: ['ICD-10', 'ICD-9', 'รหัสกรมบัญชีกลาง.', 'อุปกรณ์', 'อัตราจ่าย'],
            }
        ];

        // if (!datas.includes(undefined) && datas.length !== 0) {
        //     var toExcel = new ExportJsonExcel(option);
        //     toExcel.saveExcel();
        // } else {
        //     this.error()
        // }

        if (this.state.save && this.state.checkerror === false) {
            var toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
        } else {
            // this.setState({show:true})
            swal("ข้อมูลไม่ถูกต้อง", this.checktext , "error");
            // this.error()
        }

        // this.state.rows.map((row) => {
        //   console.log(row['g1'])
        // });
        //submit to API
        //if successful, banigate and clear the data
        //this.setState({ rows: [] })
    };

    handleDelete = key => {
        const rows = [...this.state.rows];
        this.setState({ rows: rows.filter(item => item.key !== key) });
    };

    logout = () => {
        this.setState({ password1: "" })
        this.setState({ user1: "" })
        this.setState({ password: "" })
        this.setState({ user: "" })
        this.setState({ rows: '' })
    }
    handleAdd = () => {
        const { count, rows } = this.state;
        const newData = {
            key: count,
            name: "User's name",
            age: "22",
            gender: "Female"
        };
        this.setState({
            rows: [newData, ...rows],
            count: count + 1
        });
    };

    render() {

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });
        return (

            <div>


                {this.state.user1 == 'admin' && this.state.password1 == "2107" ? <div style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <div style={{ textAlign: 'end' }}>
                        <Button
                            onClick={this.logout}
                            size="large"
                            type="danger"
                        // style={{ marginBottom: 16, marginLeft: 10 }}
                        >
                            ออกจากระบบ
                      <Icon type="arrow-right" />
                        </Button>
                    </div>
                    <Row gutter={24}>
                        <Col
                            span={8}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "2%"
                            }}
                        >
                            <Upload
                                name="file"
                                beforeUpload={this.fileHandler}
                                onRemove={() => this.setState({ rows: [] })}
                                multiple={false}
                            >
                                <Button>
                                    <Icon type="upload" /> นำเข้าไฟล์ Excel
                </Button>
                            </Upload>

                        </Col>
                        <Col span={8}>
                            {this.state.rows.length > 0 && (
                                <>
                                    <Button type="primary" shape="round" size='large'
                                        onClick={this.handleSubmit}
                                    >
                                        <Icon type="download" />
              ส่งออกไฟล์ Excel
            </Button>
                                </>
                            )}
                        </Col>

                    </Row>
                    {/* <div>
              <Upload
                name="file"
                beforeUpload={this.fileHandler}
                onRemove={() => this.setState({ rows: [] })}
                multiple={false}
              >
                <Button>
                  <Icon type="upload" /> นำเข้าไฟล์ Excel
                </Button>
              </Upload>
    
              <Button
                onClick={this.handleSubmit}
                size="large"
                type="primary"
                style={{ marginBottom: 16, marginLeft: 10 }}
              >
                Submit Data
                    </Button>
              <Button
                onClick={this.logout}
                size="large"
                type="primary"
                style={{ marginBottom: 16, marginLeft: 10 }}
              >
                ออกจากระบบ
                    </Button>
            </div> */}
                    <div style={{ marginTop: 20 }}>
                        <Table
                            bordered
                            pagination={false}
                            components={components}
                            // rowClassName={() => "editable-row"}
                            dataSource={this.state.rows}
                            columns={columns}
                        />
                    </div>
                </div> :
                    <div>
                        <Row type="flex" justify="center" align="middle" style={{ paddingTop: "15%" }} >
                            <h1>เข้าสู่ระบบ</h1>
                        </Row>
                        <Row type="flex" justify="center" align="middle" >

                            <Form
                                name="normal_login"
                                className="login-form"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ชื่อผู้ใช้" value={this.state.user} onChange={this.handleChange1} />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    {/* <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            /> */}

                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        value={this.state.password} onChange={this.handleChange2}
                                        placeholder="รหัสผ่าน"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit1}>
                                        ยืนยัน
        </Button>
                                </Form.Item>
                            </Form>
                        </Row>

                    </div>}
            </div>
        )
    }
}
