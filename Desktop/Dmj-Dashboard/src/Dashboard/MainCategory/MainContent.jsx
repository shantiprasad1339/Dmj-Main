import React, { useEffect } from 'react';
import './maincategory.css';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import ApexCharts1 from 'react-apexcharts';
import ApexCharts2 from 'react-apexcharts';

function MainContent() {
    return (
        <>
            {/* <main id="main" className="main"> */}
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>
            {/* -- End Page Title -- */}

            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">

                            <SellCart />

                            <Revenue />

                            <Customer />

                            <RecentSales />

                            <TopSelling />

                        </div>
                    </div>
                    <RecentActivity />
                </div>
            </section>

            {/* </main> */}
        </>
    );
}


const SellCart = () => {

    return(
        <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">

            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">Sales <span>| Today</span></h5>

                <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                    </div>
                    <div className="ps-3">
                        <h6>145</h6>
                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}

const Revenue = () => {

    return(
        <div className="col-xxl-4 col-md-6">
        <div className="card info-card revenue-card">

            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">Revenue <span>| This Month</span></h5>

                <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div className="ps-3">
                        <h6>$3,264</h6>
                        <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}

const Customer = () => {

    return(
        <div className="col-xxl-4 col-xl-12">
        <div className="card info-card customers-card">
            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">Customers <span>| This Year</span></h5>

                <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3">
                        <h6>1244</h6>
                        <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

const ReportsChart = () => {
    useEffect(() => {
        const options = {
            series: [
                {
                    name: 'Sales',
                    data: [31, 40, 28, 51, 42, 82, 56],
                },
                {
                    name: 'Revenue',
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
                {
                    name: 'Customers',
                    data: [15, 11, 32, 18, 9, 24, 11],
                },
            ],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            markers: {
                size: 4,
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2018-09-19T00:00:00.000Z',
                    '2018-09-19T01:30:00.000Z',
                    '2018-09-19T02:30:00.000Z',
                    '2018-09-19T03:30:00.000Z',
                    '2018-09-19T04:30:00.000Z',
                    '2018-09-19T05:30:00.000Z',
                    '2018-09-19T06:30:00.000Z',
                ],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        };

        new ApexCharts(document.querySelector('#reportsChart'), options).render();
    }, []);

    
    return (


        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="filter">
                            <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                </li>

                                <li><Link className="dropdown-item" to="#">Today</Link></li>
                                <li><Link className="dropdown-item" to="#">This Month</Link></li>
                                <li><Link className="dropdown-item" to="#">This Year</Link></li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">Reports <span>/Today</span></h5>
                            <div id="reportsChart">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const RecentSales = () => {

    return (
        <div className="col-12">
        <div className="card recent-sales overflow-auto">

            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                <table className="table table-borderless datatable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><Link to="#">#2457</Link></th>
                            <td>Brandon Jacob</td>
                            <td><Link to="#" className="text-primary">At praesentium minu</Link></td>
                            <td>$64</td>
                            <td><span className="badge bg-success">Approved</span></td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#">#2147</Link></th>
                            <td>Bridie Kessler</td>
                            <td><Link to="#" className="text-primary">Blanditiis dolor omnis similique</Link></td>
                            <td>$47</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#">#2049</Link></th>
                            <td>Ashleigh Langosh</td>
                            <td><Link to="#" className="text-primary">At recusandae consectetur</Link></td>
                            <td>$147</td>
                            <td><span className="badge bg-success">Approved</span></td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#">#2644</Link></th>
                            <td>Angus Grady</td>
                            <td><Link to="#" className="text-primar">Ut voluptatem id earum et</Link></td>
                            <td>$67</td>
                            <td><span className="badge bg-danger">Rejected</span></td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#">#2644</Link></th>
                            <td>Raheem Lehner</td>
                            <td><Link to="#" className="text-primary">Sunt similique distinctio</Link></td>
                            <td>$165</td>
                            <td><span className="badge bg-success">Approved</span></td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    );
};

const TopSelling = () => {

    return (
        <div className="col-12">
        <div className="card top-selling overflow-auto">

            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body pb-0">
                <h5 className="card-title">Top Selling <span>| Today</span></h5>

                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><Link to="#"><img src="/uploads/IMG_5086.webp" alt="" /></Link></th>
                            <td><Link to="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</Link></td>
                            <td>$64</td>
                            <td className="fw-bold">124</td>
                            <td>$5,828</td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#"><img src="/uploads/IMG_5086.webp" alt="" /></Link></th>
                            <td><Link to="#" className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                            <td>$46</td>
                            <td className="fw-bold">98</td>
                            <td>$4,508</td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#"><img src="/src/Dashboard/MainCategory/Images/product-3.jpg" alt="" /></Link></th>
                            <td><Link to="#" className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                            <td>$59</td>
                            <td className="fw-bold">74</td>
                            <td>$4,366</td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#"><img src="/src/Dashboard/MainCategory/Images/product-4.jpg" alt="" /></Link></th>
                            <td><Link to="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                            <td>$32</td>
                            <td className="fw-bold">63</td>
                            <td>$2,016</td>
                        </tr>
                        <tr>
                            <th scope="row"><Link to="#"><img src="/src/Dashboard/MainCategory/Images/product-5.jpg" alt="" /></Link></th>
                            <td><Link to="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                            <td>$79</td>
                            <td className="fw-bold">41</td>
                            <td>$3,239</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    );
};

const RecentActivity = () => {

    return (
        <div className="col-lg-4">
        <div className="card">
            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">Recent Activity <span>| Today</span></h5>

                <div className="activity">

                    <div className="activity-item d-flex">
                        <div className="activite-label">32 min</div>
                        <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                        <div className="activity-content">
                            Quia quae rerum <Link to="#" className="fw-bold text-dark">explicabo officiis</Link> beatae
                        </div>
                    </div>

                    <div className="activity-item d-flex">
                        <div className="activite-label">56 min</div>
                        <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                        <div className="activity-content">
                            Voluptatem blanditiis blanditiis eveniet
                        </div>
                    </div>


                    <div className="activity-item d-flex">
                        <div className="activite-label">2 hrs</div>
                        <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                        <div className="activity-content">
                            Voluptates corrupti molestias voluptatem
                        </div>
                    </div>


                    <div className="activity-item d-flex">
                        <div className="activite-label">1 day</div>
                        <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                        <div className="activity-content">
                            Tempore autem saepe <Link to="#" className="fw-bold text-dark">occaecati voluptatem</Link> tempore
                        </div>
                    </div>


                    <div className="activity-item d-flex">
                        <div className="activite-label">2 days</div>
                        <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                        <div className="activity-content">
                            Est sit eum reiciendis exercitationem
                        </div>
                    </div>


                    <div className="activity-item d-flex">
                        <div className="activite-label">4 weeks</div>
                        <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                        <div className="activity-content">
                            Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

const BudgetReport = () => {
    useEffect(() => {
        const options = {
            legend: {
                data: ['Allocated Budget', 'Actual Spending'],
            },
            radar: {
                indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 },
                ],
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget' },
                        { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending' },
                    ],
                },
            ],
        };

        new ApexCharts1(document.querySelector('#budgetChart'), options).render();
    }, []);

    return (
        <div className="card">
            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>
                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>
            <div className="card-body pb-0">
                <h5 className="card-title">Budget Report <span>| This Month</span></h5>
                <div id="budgetChart" style={{ minHeight: "400px" }} className="echart"></div>
            </div>
        </div>
    );
};

const TrafficChart = () => {
    useEffect(() => {
        const options = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                    ],
                },
            ],
        };

        new ApexCharts2(document.querySelector('#trafficChart'), options).render();
    }, []);

    return (
        <div className="card">
            <div className="filter">
                <Link className="icon" to="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>
                    <li><Link className="dropdown-item" to="#">Today</Link></li>
                    <li><Link className="dropdown-item" to="#">This Month</Link></li>
                    <li><Link className="dropdown-item" to="#">This Year</Link></li>
                </ul>
            </div>
            <div className="card-body pb-0">
                <h5 className="card-title">Website Traffic <span>| Today</span></h5>
                <div id="trafficChart" style={{ minHeight: "400px" }} className="echart"></div>
            </div>
        </div>
    );
};


export default MainContent;