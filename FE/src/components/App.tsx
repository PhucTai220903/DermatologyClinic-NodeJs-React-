import "../assets/admin/css/App.css";
import face1 from "./assets/images/faces/face1.jpg";
import NavigationBar from "./Navigation_bar";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="with-welcome-text">
      <div className="container-scroller">
        <div className="row p-0 m-0 proBanner" id="proBanner">
          <div className="col-md-12 p-0 m-0"></div>
        </div>
        {/* partial:partials/_navbar.html */}
        <NavigationBar />
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_settings-panel.html */}
          <div className="theme-setting-wrapper">
            <div id="settings-trigger">
              <i className="ti-settings"></i>
            </div>
            <div id="theme-settings" className="settings-panel">
              <i className="settings-close ti-close"></i>
              <p className="settings-heading">SIDEBAR SKINS</p>
              <div
                className="sidebar-bg-options selected"
                id="sidebar-light-theme"
              >
                <div className="img-ss rounded-circle bg-light border me-3"></div>
                Light
              </div>
              <div className="sidebar-bg-options" id="sidebar-dark-theme">
                <div className="img-ss rounded-circle bg-dark border me-3"></div>
                Dark
              </div>
              <p className="settings-heading mt-2">HEADER SKINS</p>
              <div className="color-tiles mx-0 px-4">
                <div className="tiles success"></div>
                <div className="tiles warning"></div>
                <div className="tiles danger"></div>
                <div className="tiles info"></div>
                <div className="tiles dark"></div>
                <div className="tiles default"></div>
              </div>
            </div>
          </div>
          <div id="right-sidebar" className="settings-panel">
            <i className="settings-close ti-close"></i>
            <ul
              className="nav nav-tabs border-top"
              id="setting-panel"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="todo-tab"
                  data-bs-toggle="tab"
                  href="#todo-section"
                  role="tab"
                  aria-controls="todo-section"
                  aria-expanded="true"
                >
                  TO DO LIST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="chats-tab"
                  data-bs-toggle="tab"
                  href="#chats-section"
                  role="tab"
                  aria-controls="chats-section"
                >
                  CHATS
                </a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div
                className="tab-pane fade show active scroll-wrapper"
                id="todo-section"
                role="tabpanel"
                aria-labelledby="todo-section"
              >
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control todo-list-input"
                        placeholder="Add To-do"
                      />
                      <button
                        type="submit"
                        className="add btn btn-primary todo-list-add-btn"
                        id="add-task"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Resolve all the low priority tickets due today
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked />
                          Schedule meeting for next week
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked />
                          Project review
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                  </ul>
                </div>
                <h4 className="px-3 text-muted mt-5 fw-light mb-0">Events</h4>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2"></i>
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Creating component page build a js
                  </p>
                  <p className="text-gray mb-0">The total number of sessions</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2"></i>
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Meeting with Alisa
                  </p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              </div>
              {/* To do section tab ends */}
              <div
                className="tab-pane fade"
                id="chats-section"
                role="tabpanel"
                aria-labelledby="chats-section"
              >
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                    Friends
                  </p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 fw-normal">
                    See All
                  </small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile">
                      <img src="../assets/images/faces/face1.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../assets/images/faces/face2.jpg" alt="image" />
                      <span className="offline"></span>
                    </div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">
                      4
                    </div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../assets/images/faces/face3.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../assets/images/faces/face4.jpg" alt="image" />
                      <span className="offline"></span>
                    </div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../assets/images/faces/face5.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../assets/images/faces/face6.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>
              {/* chat tab ends */}
            </div>
          </div>
          {/* partial */}
          {/* partial:partials/_sidebar.html */}
          <Sidebar />
          {/* partial */}
          <div className="main-panel">
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            {/* partial */}
          </div>
          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
      {/* container-scroller */}

      {/* plugins:js */}
      <script src="assets/vendors/js/vendor.bundle.base.js"></script>
      <script src="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
      {/* endinject */}
      {/* Plugin js for this page */}
      <script src="assets/vendors/chart.js/Chart.min.js"></script>
      <script src="assets/vendors/progressbar.js/progressbar.min.js"></script>
      {/* End plugin js for this page */}
      {/* inject:js */}
      <script src="assets/js/off-canvas.js"></script>
      <script src="assets/js/hoverable-collapse.js"></script>
      <script src="assets/js/template.js"></script>
      <script src="assets/js/settings.js"></script>
      <script src="assets/js/todolist.js"></script>
      {/* endinject */}
      {/* Custom js for this page*/}
      <script src="assets/js/jquery.cookie.js" type="text/javascript"></script>
      <script src="assets/js/dashboard.js"></script>
      <script src="assets/js/proBanner.js"></script>
      {/* <script src="../../assets/js/Chart.roundedBarCharts.js"></script> */}
      {/* End custom js for this page*/}
    </div>
  );
}

export default App;
