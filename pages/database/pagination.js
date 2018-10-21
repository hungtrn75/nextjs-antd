import React from "react";
import { Api } from "../../utils/Api";
import AppPagination from "../../components/database/AppPagination";
import { Pagination, Spin } from "antd";

class PaginationPage extends React.Component {
  state = {
    zips: [],
    page: 1,
    limit: 50,
    totalPages: null,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadMore();
  }

  loadMore = async () => {
    const { page, limit } = this.state;
    const data = await Api.loadZips(page, limit);
    this.setState({
      zips: data.docs,
      totalPages: data.totalPages,
      isLoading: false
    });
  };
  onChange = (page, pageSize) => {
    console.log(page);
    this.setState(
      {
        page,
        loading: true
      },
      this.loadMore
    );
  };

  onShowSizeChange = (current, size) => {
    this.setState(
      {
        page: current ? current : 1,
        limit: size,
        isLoading: true
      },
      this.loadMore
    );
  };

  render() {
    const { zips, isLoading, page, limit, totalPages } = this.state;
    return (
      <div>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "50px 30px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <AppPagination zips={zips} isLoading={isLoading} />
        )}

        <Pagination
          total={limit * totalPages}
          pageSize={limit}
          current={page}
          defaultCurrent={1}
          onChange={this.onChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    );
  }
}

export default PaginationPage;
