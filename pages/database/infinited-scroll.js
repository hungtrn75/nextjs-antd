import React from "react";
import { Api } from "../../utils/Api";
import AppPagination from "../../components/database/AppPagination";
import { Spin } from "antd";
import ZipItem from "../../components/zips/ZipItem";

class InfinitedScroll extends React.Component {
  state = {
    zips: [],
    page: 1,
    limit: 50,
    totalPages: null,
    scrolling: false
  };
  componentWillMount() {
    this.loadZips();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = e => {
    const { scrolling, totalPages, page } = this.state;
    if (scrolling) return;
    if (totalPages <= page) return;
    const lastItem = document.querySelector("ul.contacts > li:last-child");
    const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 3 * lastItem.clientHeight;
    if (pageOffset > lastItemOffset - bottomOffset) {
      this.loadMore();
    }
  };

  loadZips = async () => {
    const { page, limit } = this.state;
    const data = await Api.loadZips(page, limit);
    this.setState({
      zips: data.docs,
      totalPages: data.totalPages,
      isLoading: false
    });
  };
  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.load
    );
  };

  render() {
    const { zips, scrolling } = this.state;
    return (
      <div>
        <ul className="contacts">
          {zips.map((zip, index) => (
            <li key={index}>
              <ZipItem {...zip} />
            </li>
          ))}
        </ul>
        {scrolling && (
          <div style={{ textAlign: "center", padding: "50px 30px" }}>
            <Spin size="large" />
          </div>
        )}
      </div>
    );
  }
}

export default InfinitedScroll;
