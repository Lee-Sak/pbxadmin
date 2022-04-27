import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { CustomLayout } from "../components/CustomLayout";
import { Table } from "antd";
import { getCdr, setCdr } from "../reducers/cdr";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Calldate",
    dataIndex: "calldate",
    sorter: true,
    width: "20%",
  },
  {
    title: "Clid",
    dataIndex: "clid",
    width: "20%",
  },
  {
    title: "Src",
    dataIndex: "src",
    width: "5%",
  },
  {
    title: "Dst",
    dataIndex: "dst",
    width: "5%",
  },
  {
    title: "Dcontext",
    dataIndex: "dcontext",
    width: "5%",
  },
  {
    title: "Channel",
    dataIndex: "channel",
    width: "10%",
  },
  {
    title: "Dstchannel",
    dataIndex: "dstchannel",
    width: "10%",
  },
  {
    title: "Lastapp",
    dataIndex: "lastapp",
  },
  {
    title: "Lastdata",
    dataIndex: "lastdata",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    sorter: true,
  },
  {
    title: "Billsec",
    dataIndex: "billsec",
    sorter: true,
  },
  {
    title: "Disposition",
    dataIndex: "disposition",
    sorter: true,
  },
  {
    title: "Amaflags",
    dataIndex: "amaflags",
    sorter: true,
  },
  // {
  //   title: "Accountcode",
  //   dataIndex: "accountcode",
  //   sorter: true,
  // },
  // {
  //   title: "Userfield",
  //   dataIndex: "userfield",
  //   sorter: true,
  // },
  // {
  //   title: "Memo",
  //   dataIndex: "memo",
  //   sorter: true,
  // },
  {
    title: "Callback",
    dataIndex: "callback",
    sorter: true,
  },
  {
    title: "Dtmfq",
    dataIndex: "dtmfq",
    sorter: true,
  },
];

const Post = () => {
  console.log("post page");
  const router = useRouter();
  const dispatch = useDispatch();

  // const [info, setInfo] = useState({
  //   pagination: {
  //     current: 1,
  //     pageSize: 5,
  //     total: 0,
  //   },
  //   direction: "DESC",
  //   loading: false,
  //   error: false,
  //   done: false,
  //   data: [],
  // });

  const { isLoginDone } = useSelector((state) => state.user);
  const { loading, error, success, pagination, data, direction, column } =
    useSelector((state) => state.cdr);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    if (!isLoginDone) {
      router.push(`/signIn?beforeUrl=${router.asPath}`);
    } else {
      onClickTest();
    }
  }, [isLoginDone]);

  useEffect(() => {
    setHeight(document.getElementById("antdtable").clientHeight);
    setWidth(document.getElementById("antdtable").clientWidth);
    // console.log("table:", document.getElementById("antdtable").clientHeight);
    // console.log("table:", document.getElementById("antdtable").clientWidth);
  }, [data]);

  const onClickTest = async () => {
    dispatch(
      getCdr({
        current: pagination.current,
        pageSize: pagination.pageSize,
        column,
        direction,
      })
    );
  };

  const handleTableChange = async (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    const { current, pageSize } = pagination;

    // sort가 아니라 page 이동시
    if (Object.keys(sorter).length === 0 && sorter.constructor === Object) {
      // dispatch(setCdr())
      dispatch(getCdr({ current, pageSize, column, direction }));
    } else {
      const { field, order } = sorter;
      let direction;
      if (order === "ascend") {
        direction = "ASC";
      } else {
        direction = "DESC";
      }
      dispatch(getCdr({ current, pageSize, column: field, direction }));
    }

    // try {
    //   let url = `http://localhost:8000/cdr?page=${pagination.current}&rpp=${pagination.pageSize}&`;
    //   // sorter가 비어있을 경우는 페이지의 이동을 뜻한다.
    //   if (Object.keys(sorter).length === 0 && sorter.constructor === Object) {
    //     url += `sortName=calldate&sortDirection=${info.pagination.direction}`;
    //     console.log("a");
    //   } else {
    //     console.log(sorter);
    //     if (sorter.order === "ascend") {
    //       url += `sortName=${sorter.field}&sortDirection=ASC`;
    //     } else {
    //       url += `sortName=${sorter.field}&sortDirection=DESC`;
    //     }
    //   }
    //   const res = await axios.get(url);
    //   setInfo((prev) => ({
    //     ...prev,
    //     pagination: {
    //       current: pagination.current,
    //       total: res.data.data.total,
    //       pageSize: pagination.pageSize,
    //     },
    //     direction: sorter.order === "ascend" ? "ASC" : "DESC",
    //     data: res.data.data.data,
    //     loading: false,
    //     done: true,
    //   }));
    // } catch (err) {
    //   console.log(err);
    // }
    // try {
    //   setInfo((prev) => ({
    //     ...prev,
    //     loading: true,
    //     error: false,
    //     done: false,
    //   }));
    //   let url = `http://localhost:8000/cdr?page=${pagination.current}&rpp=${pagination.pageSize}&`;
    //   if (Object.keys(sorter).length === 0 && sorter.constructor === Object) {
    //     url += `sortName=calldate&sortDirection=DESC`;
    //     console.log("a");
    //   } else {
    //     console.log(sorter);
    //     if (sorter.order === "ascend") {
    //       url += `sortName=${sorter.field}&sortDirection=ASC`;
    //     } else {
    //       url += `sortName=${sorter.field}&sortDirection=DESC`;
    //     }
    //   }
    //   const res = await axios.get(url);
    //   setInfo((prev) => ({
    //     ...prev,
    //     pagination: {
    //       ...prev.pagination,
    //       current: pagination.current,
    //       total: res.data.data.total,
    //       pageSize: pagination.pageSize,
    //     },
    //     loading: false,
    //     done: true,
    //     data: res.data.data.data,
    //   }));
    // } catch (err) {
    //   setInfo((prev) => ({
    //     ...prev,
    //     data: [],
    //     error: true,
    //     loading: false,
    //   }));
    // }
  };

  return (
    <CustomLayout isLoginDone={isLoginDone} width={width} height={height}>
      {isLoginDone && (
        <>
          {loading && <div>요청중..</div>}
          {error && <div>요청에러</div>}

          {success && (
            <Table
              size="small"
              id="antdtable"
              columns={columns}
              rowKey={(record) => record.uniqueid + record.dstchannel}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          )}
        </>
      )}
    </CustomLayout>
  );
};

export default Post;
