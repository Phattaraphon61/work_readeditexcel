import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Upload, Typography, Space, message } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/editable";
import ExportJsonExcel from 'js-export-excel';
const { Text } = Typography;
export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      name: null,
      errorMessage: null,
      columns: [
        {
          title: "ICD-10",
          dataIndex: "ICD_10",
          editable: true,
          render: text => text
        },
        {
          title: "ICD-9",
          dataIndex: "ICD_9",
          editable: true
        },
        {
          title: "รหัสกรมบัญชีกลาง.",
          dataIndex: "g1",
          editable: true
        },
        {
          title: "อุปกรณ์",
          dataIndex: "g2",
          editable: true
        },
        {
          title: "อัตราจ่าย",
          dataIndex: "g3",
          editable: true
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
  }

  error = () => {
    message.error('ข้อมูลยังไม่ครบ');
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
            if (row.includes(undefined) == true) {

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
                g2: row[3],
                g3: undefined
              });
            }
            if (row.includes(undefined) == false) {

              newRows.push({
                key: index,
                ICD_10: row[0],
                ICD_9: row[1],
                g1: row[2],
                g2: row[3],
                g3: dict[row[2]]
              });
            }
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

    if (!datas.includes(undefined) && datas.length !== 0) {
      var toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel();
    } else {
      this.error()
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
    window.location = '/'
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
      <div style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
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
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
