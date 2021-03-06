(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-0645856a"],
    {
        "517a": function (t, e, s) {},
        "57c8": function (t, e, s) {
            "use strict";
            s.r(e);
            var o = function () {
                    var t = this,
                        e = t.$createElement,
                        s = t._self._c || e;
                    return s(
                        "div",
                        [
                            s("HeaderEFTG", { ref: "headerEFTG", on: { login: t.onLogin, logout: t.onLogout } }),
                            s("div", { staticClass: "container" }, [
                                s("div", { staticClass: "row" }, [
                                    s("div", { staticClass: "col-md-6" }, [
                                        s("h2", [t._v("Proposals")]),
                                        t.steemdao.name ? s("div", [t._v("Total fund: " + t._s(t.steemdao.balance))]) : t._e(),
                                        t.steemdao.name ? s("div", [t._v("Daily budget: " + t._s(t.steemdao.daily_budget))]) : t._e(),
                                        t.steemdao.name ? s("div", [t._v("Budget for the next hour: " + t._s(t.steemdao.hourly_budget))]) : t._e(),
                                    ]),
                                    t.refAccount
                                        ? s("div", { staticClass: "col-md-6 text-right" }, [
                                              s("div", { staticClass: "big-image-profile", style: { backgroundImage: "url(" + t.refAccount.image + ")" } }),
                                              s("h3", [t._v("@" + t._s(t.refAccount.name))]),
                                              s("div", [t._v(t._s(t.refAccount.votes_sp))]),
                                              s("div", [t._v(t._s(t.refAccount.votes_description))]),
                                          ])
                                        : t._e(),
                                ]),
                                s("div", { staticClass: "row mt-3" }, [
                                    s("div", { staticClass: "col-md-2 mr-2 mt-1" }, [
                                        s("input", {
                                            directives: [{ name: "model", rawName: "v-model", value: t.checkVotesAccount, expression: "checkVotesAccount" }],
                                            staticClass: "form-control mr-2",
                                            class: { "is-invalid": t.error.check_votes_account },
                                            attrs: { type: "text", placeholder: "Account" },
                                            domProps: { value: t.checkVotesAccount },
                                            on: {
                                                keyup: function (e) {
                                                    return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.checkVotes(e);
                                                },
                                                input: function (e) {
                                                    e.target.composing || (t.checkVotesAccount = e.target.value);
                                                },
                                            },
                                        }),
                                        t.error.check_votes_account ? s("div", { staticClass: "invalid-feedback" }, [t._v(t._s(t.errorText.check_votes_account))]) : t._e(),
                                    ]),
                                    s("div", { staticClass: "col-md-2 mt-1" }, [s("button", { staticClass: "btn btn-primary", on: { click: t.checkVotes } }, [t._v("Check votes")])]),
                                ]),
                                s("div", { staticClass: "row mb-3" }, [
                                    s("div", { staticClass: "col-12 text-right" }, [
                                        s(
                                            "select",
                                            {
                                                directives: [{ name: "model", rawName: "v-model", value: t.sort_order, expression: "sort_order" }],
                                                on: {
                                                    change: function (e) {
                                                        var s = Array.prototype.filter
                                                            .call(e.target.options, function (t) {
                                                                return t.selected;
                                                            })
                                                            .map(function (t) {
                                                                var e = "_value" in t ? t._value : t.value;
                                                                return e;
                                                            });
                                                        t.sort_order = e.target.multiple ? s : s[0];
                                                    },
                                                },
                                            },
                                            [
                                                s("option", { attrs: { value: "votes" } }, [t._v("Sort by votes")]),
                                                s("option", { attrs: { value: "start_date" } }, [t._v("Sort by start date")]),
                                                s("option", { attrs: { value: "end_date" } }, [t._v("Sort by end date")]),
                                                s("option", { attrs: { value: "total_days" } }, [t._v("Sort by total days")]),
                                                s("option", { attrs: { value: "id" } }, [t._v("Sort by id")]),
                                                s("option", { attrs: { value: "status" } }, [t._v("Sort by status")]),
                                                s("option", { attrs: { value: "creator" } }, [t._v("Sort by creator")]),
                                                s("option", { attrs: { value: "receiver" } }, [t._v("Sort by receiver")]),
                                                s("option", { attrs: { value: "daily_pay" } }, [t._v("Sort by daily pay")]),
                                                s("option", { attrs: { value: "total_pay" } }, [t._v("Sort by total pay")]),
                                            ]
                                        ),
                                    ]),
                                ]),
                                s("div", { staticClass: "card mb-2" }, [
                                    s(
                                        "ul",
                                        { staticClass: "list-group list-group-flush" },
                                        t._l(t.proposals, function (e, o) {
                                            return s(
                                                "li",
                                                {
                                                    key: o,
                                                    staticClass: "list-group-item",
                                                    class: { "total-funding": 1 == e.funding_percent, "partial-funding": e.funding_percent > 0 && e.funding_percent < 1, "no-funding": e.funding_percent <= 0 },
                                                    on: {
                                                        click: function (e) {
                                                            return t.selectProposal(o);
                                                        },
                                                    },
                                                },
                                                [
                                                    s("div", { staticClass: "row" }, [
                                                        s("div", { staticClass: "col-md-3" }, [
                                                            s("div", { staticClass: "image-profile mr-2", style: { backgroundImage: "url(" + e.image + ")" } }),
                                                            s("span", [t._v(t._s(e.creator) + " "), e.creator !== e.receiver ? s("span", [t._v("(receiver @" + t._s(e.receiver) + ")")]) : t._e()]),
                                                            s("div", [s("router-link", { attrs: { to: e.url } }, [t._v(t._s(e.subject))])], 1),
                                                            s("div", [
                                                                s("small", [t._v("id #" + t._s(e.id))]),
                                                                s("span", { staticClass: "badge ml-2", class: { "badge-primary": e.active, "badge-warning": !e.active } }, [t._v(t._s(e.status))]),
                                                            ]),
                                                        ]),
                                                        s("div", { staticClass: "col-md-4" }, [t._v("From " + t._s(e.start_date) + " to " + t._s(e.end_date) + " (" + t._s(e.total_time) + ")")]),
                                                        s("div", { staticClass: "col-md-2" }, [t._v(t._s(e.daily_pay) + " daily")]),
                                                        s("div", { staticClass: "col-md-2" }, [t._v(t._s(e.votes_sp))]),
                                                    ]),
                                                ]
                                            );
                                        }),
                                        0
                                    ),
                                ]),
                                this.$store.state.auth.logged
                                    ? s("div", { staticClass: "row mt-4" }, [
                                          s("div", { staticClass: "form-group col-12" }, [
                                              s("button", { staticClass: "btn btn-primary btn-large mr-2", attrs: { disabled: t.saving }, on: { click: t.save } }, [
                                                  t.saving ? s("div", { staticClass: "mini loader" }) : t._e(),
                                                  t._v("Save"),
                                              ]),
                                              s("button", { staticClass: "btn btn-secondary btn-large", on: { click: t.reset } }, [t._v("Reset")]),
                                          ]),
                                      ])
                                    : t._e(),
                                t.alert.info ? s("div", { staticClass: "alert alert-info", attrs: { role: "alert" } }, [t._v(t._s(t.alert.infoText))]) : t._e(),
                                t.alert.success ? s("div", { staticClass: "alert alert-success", attrs: { role: "alert" }, domProps: { innerHTML: t._s(t.alert.successText) } }) : t._e(),
                                t.alert.danger ? s("div", { staticClass: "alert alert-danger", attrs: { role: "alert" } }, [t._v(t._s(t.alert.dangerText))]) : t._e(),
                            ]),
                        ],
                        1
                    );
                },
                a = [],
                r = (s("20d6"), s("7f7f"), s("ac6a"), s("55dd"), s("96cf"), s("1da1")),
                n = s("1429"),
                i = s("2b53"),
                c = s("766b"),
                l = s("9944"),
                u = s("41cb"),
                p = s("db49"),
                d = s("4d78"),
                v = {
                    name: "ProposalsPage",
                    data: function () {
                        return { proposals: [], sort_order: "votes", steemdao: {}, saving: !1, checkVotesAccount: "", refAccount: null, error: { check_votes_account: !1 }, errorText: { check_votes_account: "" } };
                    },
                    components: { HeaderEFTG: n["a"] },
                    mixins: [d["a"], i["a"], c["a"]],
                    created: function () {
                        var t = this;
                        this.getChainProperties().then(function () {
                            t.getProposals();
                        });
                    },
                    watch: {
                        sort_order: function (t) {
                            this.sortBy(t);
                        },
                    },
                    methods: {
                        getSteemDao: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var e;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return (t.prev = 0), (t.next = 3), this.steem_database_call("get_accounts", [["blurt.dao"]]);
                                                    case 3:
                                                        (e = t.sent),
                                                            (this.steemdao = e[0]),
                                                            console.log(this.steemdao),
                                                            (this.steemdao.daily_budget = (parseFloat(this.steemdao.balance) / 100).toFixed(3) + " " + p["a"].SP),
                                                            (this.steemdao.hourly_budget = (parseFloat(this.steemdao.balance) / 2400).toFixed(3) + " " + p["a"].SP),
                                                            (t.next = 14);
                                                        break;
                                                    case 10:
                                                        throw ((t.prev = 10), (t.t0 = t["catch"](0)), this.showDanger("Problems loading steem.dao"), t.t0);
                                                    case 14:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this,
                                        [[0, 10]]
                                    );
                                })
                            );
                            function e() {
                                return t.apply(this, arguments);
                            }
                            return e;
                        })(),
                        getProposals: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var e, s, o, a;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return console.log("get"), (this.proposals = []), (t.next = 4), this.getSteemDao();
                                                    case 4:
                                                        return (t.next = 6), this.steem_database_call("list_proposals", [["", 0], 100, "by_creator"]);
                                                    case 6:
                                                        for (s in ((e = t.sent), e))
                                                            (o = e[s]),
                                                                (a = new Date(o.end_date) - new Date(o.start_date)),
                                                                (o.url = p["a"].EXPLORER + "@" + o.creator + "/" + o.permlink),
                                                                (o.image = "https://img.blurt.world/profileimage/" + o.creator),
                                                                (o.votes_sp = this.witnessVotes2sp(o.total_votes)),
                                                                (o.vote = !1),
                                                                (o.newVote = !1),
                                                                (o.total_time = l["a"].textTime(a)),
                                                                (o.total_pay = ((parseFloat(o.daily_pay) * a) / 864e5).toFixed(3) + " " + p["a"].SP),
                                                                (o.active = this.isActive(o)),
                                                                (o.status = o.active ? "started" : "upcoming"),
                                                                this.proposals.push(o);
                                                        this.sortPayments(), this.sortBy(this.sort_order), this.$store.state.auth.logged && this.loadVotesFromAccount(), this.loadVotesNoActive();
                                                    case 12:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function e() {
                                return t.apply(this, arguments);
                            }
                            return e;
                        })(),
                        sortPayments: function () {
                            this.sortBy("votes");
                            var t = parseFloat(this.steemdao.sbd_balance) / 100;
                            for (var e in this.proposals) {
                                var s = this.proposals[e];
                                if ("upcoming" !== s.status) {
                                    var o = parseFloat(s.daily_pay);
                                    o <= t ? ((s.funding_percent = 1), (t -= o)) : ((s.funding_percent = t / o), (t = 0));
                                } else s.funding_percent = -1;
                            }
                        },
                        sortBy: function (t) {
                            var e = this;
                            switch (t) {
                                case "votes":
                                    return void this.proposals.sort(function (t, e) {
                                        return parseInt(e.total_votes) - parseInt(t.total_votes);
                                    });
                                case "start_date":
                                    return void this.proposals.sort(function (t, e) {
                                        return new Date(t.start_date) - new Date(e.start_date);
                                    });
                                case "end_date":
                                    return void this.proposals.sort(function (t, e) {
                                        return new Date(t.end_date) - new Date(e.end_date);
                                    });
                                case "total_days":
                                    return void this.proposals.sort(function (t, e) {
                                        return new Date(e.end_date) - new Date(e.start_date) - (new Date(t.end_date) - new Date(t.start_date));
                                    });
                                case "creator":
                                    return void this.proposals.sort(function (t, e) {
                                        return t.creator.localeCompare(e.creator);
                                    });
                                case "receiver":
                                    return void this.proposals.sort(function (t, e) {
                                        return t.receiver.localeCompare(e.receiver);
                                    });
                                case "daily_pay":
                                    return void this.proposals.sort(function (t, e) {
                                        return parseFloat(e.daily_pay) - parseFloat(t.daily_pay);
                                    });
                                case "total_pay":
                                    return void this.proposals.sort(function (t, e) {
                                        return (new Date(e.end_date) - new Date(e.start_date)) * parseFloat(e.daily_pay) - (new Date(t.end_date) - new Date(t.start_date)) * parseFloat(t.daily_pay);
                                    });
                                case "status":
                                    return void this.proposals.sort(function (t, s) {
                                        var o = e.isActive(t),
                                            a = e.isActive(s);
                                        return o == a ? parseInt(s.total_votes) - parseInt(t.total_votes) : o && !a ? -1 : !o && a ? 1 : void 0;
                                    });
                                case "id":
                                    return void this.proposals.sort(function (t, e) {
                                        return parseInt(t.id) - parseInt(e.id);
                                    });
                                default:
                                    throw new Error("The type '".concat(t, "' for sort does not exists"));
                            }
                        },
                        isActive: function (t) {
                            var e = Date.now();
                            return e <= new Date(t.end_date + "Z") && e >= new Date(t.start_date + "Z");
                        },
                        loadVotesNoActive: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var e, s, o, a, r, n, i, c;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        t.t0 = regeneratorRuntime.keys(this.proposals);
                                                    case 1:
                                                        if ((t.t1 = t.t0()).done) {
                                                            t.next = 45;
                                                            break;
                                                        }
                                                        if (((e = t.t1.value), (s = this.proposals[e]), !this.isActive(s))) {
                                                            t.next = 6;
                                                            break;
                                                        }
                                                        return t.abrupt("continue", 1);
                                                    case 6:
                                                        (s.total_votes = 0), (o = ""), (a = !1), (r = []);
                                                    case 10:
                                                        if (a) {
                                                            t.next = 34;
                                                            break;
                                                        }
                                                        return (t.next = 13), this.steem_database_call("list_proposal_votes", [[s.id, o], 100, "by_proposal_voter"]);
                                                    case 13:
                                                        if (((n = t.sent), 0 != n.length)) {
                                                            t.next = 16;
                                                            break;
                                                        }
                                                        return t.abrupt("break", 34);
                                                    case 16:
                                                        if (
                                                            (console.log(
                                                                "Votes: length: "
                                                                    .concat(n.length, ". from '")
                                                                    .concat(n[0].voter, "' to '")
                                                                    .concat(n[n.length - 1].voter, "'")
                                                            ),
                                                            1 != n.length)
                                                        ) {
                                                            t.next = 22;
                                                            break;
                                                        }
                                                        (a = !0), n[0].proposal.id == s.id && r.push(n[0].voter), (t.next = 31);
                                                        break;
                                                    case 22:
                                                        i = 0;
                                                    case 23:
                                                        if (!(i < n.length - 1)) {
                                                            t.next = 31;
                                                            break;
                                                        }
                                                        if (n[i].proposal.id === s.id) {
                                                            t.next = 27;
                                                            break;
                                                        }
                                                        return (a = !0), t.abrupt("break", 31);
                                                    case 27:
                                                        r.push(n[i].voter);
                                                    case 28:
                                                        i++, (t.next = 23);
                                                        break;
                                                    case 31:
                                                        (o = n[n.length - 1].voter), (t.next = 10);
                                                        break;
                                                    case 34:
                                                        return console.log("voters of id ".concat(s.id)), console.log(r), (t.next = 38), this.steem_database_call("get_accounts", [r]);
                                                    case 38:
                                                        for (i in ((c = t.sent), c)) s.total_votes += parseInt(this.witness_vote_weight(c[i]));
                                                        console.log("total votes ".concat(s.total_votes)), (s.votes_sp = this.witnessVotes2sp(s.total_votes)), this.$set(this.proposals, e, s), (t.next = 1);
                                                        break;
                                                    case 45:
                                                        this.sortPayments(), this.sortBy(this.sort_order);
                                                    case 47:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function e() {
                                return t.apply(this, arguments);
                            }
                            return e;
                        })(),
                        witness_vote_weight: function (t) {
                            return "" !== t.proxy ? 0 : this.no_proxy_vote_weight(t) + this.proxy_vote_weight(t);
                        },
                        no_proxy_vote_weight: function (t) {
                            return Math.floor(1e6 * parseFloat(t.vesting_shares));
                        },
                        proxy_vote_weight: function (t) {
                            var e = 0;
                            for (var s in t.proxied_vsf_votes) e += parseInt(t.proxied_vsf_votes[s]);
                            return e;
                        },
                        calculate_vote: function (t) {
                            var e = { voter: t.name, votes: this.witness_vote_weight(t), no_proxy_votes: this.no_proxy_vote_weight(t), proxy_votes: this.proxy_vote_weight(t) };
                            return (
                                "" === t.proxy
                                    ? ((e.votes_sp = this.witnessVotes2sp(e.votes)),
                                      e.proxy_votes > 0 ? (e.votes_description = "(".concat(this.witnessVotes2sp(e.no_proxy_votes), " + ").concat(this.witnessVotes2sp(e.proxy_votes), " proxy)")) : (e.votes_description = ""))
                                    : ((e.votes_sp = this.witnessVotes2sp(0)),
                                      (e.votes_description = "(".concat(this.witnessVotes2sp(e.no_proxy_votes))),
                                      e.proxy_votes > 0 && (e.votes_description += " + ".concat(this.witnessVotes2sp(e.proxy_votes), " proxy,")),
                                      (e.votes_description += " proxied to @".concat(t.proxy, ")"))),
                                e
                            );
                        },
                        checkVotes: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return (this.user_votes = !1), (this.error.check_votes_account = !1), (t.prev = 2), (t.next = 5), this.loadVotesFromAccount(this.checkVotesAccount);
                                                    case 5:
                                                        t.next = 12;
                                                        break;
                                                    case 7:
                                                        throw ((t.prev = 7), (t.t0 = t["catch"](2)), (this.error.check_votes_account = !0), (this.errorText.check_votes_account = t.t0.message), t.t0);
                                                    case 12:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this,
                                        [[2, 7]]
                                    );
                                })
                            );
                            function e() {
                                return t.apply(this, arguments);
                            }
                            return e;
                        })(),
                        loadVotesFromAccount: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t(e) {
                                    var s, o, a, r, n, i, c;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return e || ((e = this.$store.state.auth.user), (this.user_votes = !0)), this.clearVotes(), (t.next = 4), this.steem_database_call("get_accounts", [[e]]);
                                                    case 4:
                                                        if (((s = t.sent), s && 0 != s.length)) {
                                                            t.next = 7;
                                                            break;
                                                        }
                                                        throw new Error("@".concat(e, " does not exist"));
                                                    case 7:
                                                        return (
                                                            (this.refAccount = s[0]),
                                                            (this.refAccount.image = "https://images.blurt.blog/u/" + e + "/avatar"),
                                                            (o = this.calculate_vote(this.refAccount)),
                                                            (this.refAccount.votes_sp = o.votes_sp),
                                                            (this.refAccount.votes_description = o.votes_description),
                                                            (t.next = 14),
                                                            this.steem_database_call("list_proposal_votes", [[e, 0], 100, "by_voter_proposal"])
                                                        );
                                                    case 14:
                                                        (a = t.sent), (r = []), (t.t0 = regeneratorRuntime.keys(a));
                                                    case 17:
                                                        if ((t.t1 = t.t0()).done) {
                                                            t.next = 26;
                                                            break;
                                                        }
                                                        if (((n = t.t1.value), (o = a[n]), o.voter === e)) {
                                                            t.next = 22;
                                                            break;
                                                        }
                                                        return t.abrupt("break", 26);
                                                    case 22:
                                                        (i = this.proposals.findIndex(function (t) {
                                                            return t.id === o.proposal.id;
                                                        })),
                                                            i >= 0 ? ((c = this.proposals[i]), (c.vote = !0), (c.newVote = !0), this.$set(this.proposals, i, c)) : r.push(o),
                                                            (t.next = 17);
                                                        break;
                                                    case 26:
                                                        r.length > 0 && (console.log("TODO: these proposals are already voted but they are not in the TOP list:"), console.log(r)), console.log("end");
                                                    case 28:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function e(e) {
                                return t.apply(this, arguments);
                            }
                            return e;
                        })(),
                        selectProposal: function (t) {
                            var e = this.proposals[t];
                            u["a"].push({ name: "Proposal", params: { id: e.id } });
                        },
                        toggleVote: function (t) {
                            if (this.refAccount) {
                                if (!this.$store.state.auth.logged) return;
                                if (this.refAccount.name !== this.$store.state.auth.user) return;
                            }
                            var e = this.proposals[t];
                            (e.newVote = !e.newVote), this.$set(this.proposals, t, e);
                        },
                        save: function () {
                            var t = this.$store.state.auth.user,
                                e = this.$store.state.auth.keys.active,
                                s = this.$store.state.auth.keys.owner,
                                o = null;
                            if (null != e) o = e;
                            else {
                                if (null == s) return void this.showDanger("Please login with master, owner, or active key");
                                o = s;
                            }
                            var a = this.proposals.slice(),
                                r = [],
                                n = [];
                            for (var i in a) {
                                var c = a[i];
                                c.newVote != c.vote && (!0 === c.newVote ? r.push(c.id) : n.push(c.id));
                            }
                            if (0 != r.length || 0 != n.length) {
                                var l = [];
                                r.sort(function (t, e) {
                                    return t - e;
                                }),
                                    n.sort(function (t, e) {
                                        return t - e;
                                    });
                                var u = 0;
                                for (i = 0; i < r.length; i++)
                                    u % p["a"].STEEM_PROPOSAL_MAX_IDS_NUMBER == 0 && l.push(["update_proposal_votes", { voter: t, proposal_ids: [], approve: !0, extensions: [] }]), l[l.length - 1][1].proposal_ids.push(r[i]), u++;
                                for (u = 0, i = 0; i < n.length; i++)
                                    u % p["a"].STEEM_PROPOSAL_MAX_IDS_NUMBER == 0 && l.push(["update_proposal_votes", { voter: t, proposal_ids: [], approve: !1, extensions: [] }]), l[l.length - 1][1].proposal_ids.push(n[i]), u++;
                                (this.saving = !0), this.hideSuccess(), this.hideDanger(), this.hideInfo();
                                var d = this;
                                this.steem_broadcast_sendOperations(l, o)
                                    .then(function (t) {
                                        (d.saving = !1), d.showSuccess('<a href="'.concat(p["a"].EXPLORER2, "b/").concat(t.block_num, "/").concat(t.id, '" class="alert-link" target="_blank">Votes saved!</a>')), d.loadVotesFromAccount();
                                    })
                                    .catch(function (t) {
                                        throw ((d.saving = !1), d.showDanger(t.message), console.log("operations"), console.log(l), t);
                                    });
                            } else this.showDanger("Nothing to change");
                        },
                        reset: function () {
                            for (var t in this.proposals) {
                                var e = this.proposals[t];
                                (e.newVote = JSON.parse(JSON.stringify(e.vote))), this.$set(this.proposals, t, e);
                            }
                            this.hideSuccess(), this.hideDanger(), this.hideInfo();
                        },
                        clearVotes: function () {
                            for (var t in this.proposals) {
                                var e = this.proposals[t];
                                (e.vote = !1), (e.newVote = !1), this.$set(this.proposals, t, e);
                            }
                        },
                        onLogin: function () {
                            this.loadVotesFromAccount(), this.hideSuccess(), this.hideDanger(), this.hideInfo();
                        },
                        onLogout: function () {
                            this.clearVotes(), this.hideSuccess(), this.hideDanger(), this.hideInfo();
                        },
                    },
                },
                h = v,
                _ = (s("742b"), s("2877")),
                f = Object(_["a"])(h, o, a, !1, null, "5b96786f", null);
            e["default"] = f.exports;
        },
        "742b": function (t, e, s) {
            "use strict";
            var o = s("517a"),
                a = s.n(o);
            a.a;
        },
    },
]);
//# sourceMappingURL=chunk-0645856a.4a35ca5a.js.map
