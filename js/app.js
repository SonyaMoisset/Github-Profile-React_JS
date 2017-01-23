const API = 'https://api.github.com/users';

class GitHubProfileCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          username: 'sonyamoisset',
          name:'',
          avatar:'',
          location:'',
          company:'',
          email:'',
          blog:'',
          repo:'',
          followers:'',
          following:''
        }
    }

    fetchProfile(username) {
        let url = `${API}/${username}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    location: data.location,
                    company: data.company,
                    email: data.email,
                    blog: data.blog,
                    repo: data.public_repos,
                    followers: data.followers,
                    following: data.following
                })
            })
    }

    componentDidMount() {
        this.fetchProfile(this.state.username);
    }

    render () {
        return (
            <div className="container free-bird">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12"></div>
                        <div className="col-lg-5 col-md-12">
                            <div className="card-wrapper">
                                <div className="card-rotating">
                                    <div className="face front">
                                        <GitHubImage />
                                        <GitHubAvatar data={this.state} />
                                        <div className="card-block">
                                            <GitHubName data={this.state} />
                                            <GitHubContact data={this.state} />
                                            <GitHubInfo data={this.state} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class GitHubImage extends React.Component {
    render () {
        return (
            <div className="card-up">
                <img src="computer.jpg" className="img-fluid"/>
            </div>
        )
    }
}

class GitHubAvatar extends React.Component {
    render () {
        let data = this.props.data;
        return (
            <div className="avatar">
                <a href={`https://github.com/${data.username}`} target="_blank">
                    <img src={data.avatar} className="rounded-circle img-responsive"/>
                </a>
            </div>
        )
    }
}

class GitHubName extends React.Component {
    render () {
        let data = this.props.data;
        return (
            <div>
                <a href={`https://github.com/${data.username}`} target="_blank">
                    <h4 id="username">{data.name}</h4>
                </a>
                <p id="city">{data.location}</p>
                <p id="company">{data.company}</p>
            </div>
        )
    }
}

class GitHubContact extends React.Component {
    render () {
        let data = this.props.data;
        return (
            <div className="row">
                <div className="col-lg-6">
                    <p>Email</p>
                    <a className="icons-sm" href={`mailto:${data.email}`}>
                        <i id="email" className="fa fa-envelope-o" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="col-lg-6">
                    <p>Website</p>
                    <a className="icons-sm" href={`https://${data.blog}`} target="_blank">
                        <i id="website" className="fa fa-globe" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }
}

class GitHubInfo extends React.Component {
    render () {
        let data = this.props.data;
        return (
            <div>
                <hr/>
                <div className="row">
                    <div className="col-lg-4">
                        <a href={`https://github.com/${data.username}?tab=repositories`}  target="_blank">
                            <h5 class="pt-1">Repos</h5>
                        </a>
                        <p>{data.repo}</p>
                    </div>
                    <div className="col-lg-4">
                        <a href={`https://github.com/${data.username}?tab=followers`}  target="_blank">
                            <h5 class="pt-1">Followers</h5>
                        </a>
                        <p>{data.followers}</p>
                    </div>
                    <div className="col-lg-4">
                        <a href={`https://github.com/${data.username}?tab=following`}  target="_blank">
                            <h5 class="pt-1">Following</h5>
                        </a>
                        <p>{data.following}</p>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <GitHubProfileCard />,
    document.getElementById('GITHUB')
);
