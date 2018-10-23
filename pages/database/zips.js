import React from "react";
import { Api } from "../../utils/Api";
import AppPagination from "../../components/database/AppPagination";
import { Pagination, Spin } from "antd";
import { getZips } from "../../modules/zips/actions";
import { connect } from "react-redux";

class ZipPage extends React.Component {
  state = {
    page: 1,
    limit: 50,
    isLoading: false
  };

  static async getInitialProps({ ctx, isServer }) {
    const stores = await ctx.store.dispatch(getZips(1, 50));

    return { stores };
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
    const { docs, page, limit, totalPages } = this.props.zips;
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", padding: "50px 30px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <AppPagination zips={docs} isLoading={this.state.isLoading} />
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

const mapStateToProps = state => ({
  zips: state.zips
});

export default connect(
  mapStateToProps,
  {}
)(ZipPage);
