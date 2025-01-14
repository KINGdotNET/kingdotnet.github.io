(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-7141bc53"],
    {
        "5a78": function (t, s, e) {
            "use strict";
            var o = e("bbd7"),
                a = e.n(o);
            a.a;
        },
        bbd7: function (t, s, e) {},
        dbfd: function (t, s, e) {
            "use strict";
            e.r(s);
            var o = function () {
                    var t = this,
                        s = t.$createElement,
                        e = t._self._c || s;
                    return e(
                        "div",
                        [
                            e("HeaderEFTG", { ref: "headerEFTG", on: { login: t.onLogin, logout: t.onLogout } }),
                            e("div", { staticClass: "container" }, [
                                e("h2", [t._v(t._s(t.proposal.subject))]),
                                e("div", { staticClass: "row mt-3 mb-2" }, [
                                    e("div", { staticClass: "col-2" }, [t._v("Creator")]),
                                    e("div", { staticClass: "col-10" }, [e("div", { staticClass: "image-profile mr-2", style: { backgroundImage: "url(" + t.proposal.image + ")" } }), e("span", [t._v(t._s(t.proposal.creator))])]),
                                ]),
                                e("div", { staticClass: "row mb-2" }, [
                                    e("div", { staticClass: "col-2" }, [t._v("Receiver")]),
                                    e("div", { staticClass: "col-10" }, [e("div", { staticClass: "image-profile mr-2", style: { backgroundImage: "url(" + t.proposal.image_receiver + ")" } }), e("span", [t._v(t._s(t.proposal.receiver))])]),
                                ]),
                                e("div", { staticClass: "row mb-2" }, [
                                    e("div", { staticClass: "col-2" }, [t._v("Subject")]),
                                    e("div", { staticClass: "col-10" }, [e("router-link", { attrs: { to: t.proposal.url } }, [t._v(t._s(t.proposal.subject))])], 1),
                                ]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Start date")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.start_date))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("End date")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.end_date))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Total days")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.total_time))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Daily pay")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.daily_pay))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Total pay")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.total_pay))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Status")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.status) + " " + t._s(t.proposal.status_extended))])]),
                                e("div", { staticClass: "row mb-2" }, [e("div", { staticClass: "col-2" }, [t._v("Votes")]), e("div", { staticClass: "col-10" }, [t._v(t._s(t.proposal.votes_sp))])]),
                                this.$store.state.auth.logged
                                    ? e("div", { staticClass: "row mt-4" }, [
                                          e("div", { staticClass: "form-group col-12" }, [
                                              e("button", { staticClass: "btn btn-primary btn-large mr-2", attrs: { disabled: t.saving }, on: { click: t.vote } }, [
                                                  t.saving ? e("div", { staticClass: "mini loader" }) : t._e(),
                                                  t._v(t._s(t.display_button)),
                                              ]),
                                          ]),
                                      ])
                                    : t._e(),
                                t.alert.info ? e("div", { staticClass: "alert alert-info", attrs: { role: "alert" } }, [t._v(t._s(t.alert.infoText))]) : t._e(),
                                t.alert.success ? e("div", { staticClass: "alert alert-success", attrs: { role: "alert" }, domProps: { innerHTML: t._s(t.alert.successText) } }) : t._e(),
                                t.alert.danger ? e("div", { staticClass: "alert alert-danger", attrs: { role: "alert" } }, [t._v(t._s(t.alert.dangerText))]) : t._e(),
                                e("h3", { staticClass: "mt-5" }, [t._v(t._s(t.votes.length) + " Votes")]),
                                e("div", { staticClass: "row mb-3" }, [
                                    e("div", { staticClass: "col-12 text-right" }, [
                                        e(
                                            "select",
                                            {
                                                directives: [{ name: "model", rawName: "v-model", value: t.sort_order, expression: "sort_order" }],
                                                on: {
                                                    change: function (s) {
                                                        var e = Array.prototype.filter
                                                            .call(s.target.options, function (t) {
                                                                return t.selected;
                                                            })
                                                            .map(function (t) {
                                                                var s = "_value" in t ? t._value : t.value;
                                                                return s;
                                                            });
                                                        t.sort_order = s.target.multiple ? e : e[0];
                                                    },
                                                },
                                            },
                                            [e("option", { attrs: { value: "votes" } }, [t._v("Sort by votes")]), e("option", { attrs: { value: "name" } }, [t._v("Sort by name")])]
                                        ),
                                    ]),
                                ]),
                                e("div", { staticClass: "card mb-2" }, [
                                    e(
                                        "ul",
                                        { staticClass: "list-group list-group-flush" },
                                        t._l(t.votes, function (s, o) {
                                            return e("li", { key: o, staticClass: "list-group-item" }, [
                                                e("div", { staticClass: "row" }, [
                                                    e("div", { staticClass: "col-3" }, [t._v("@" + t._s(s.voter))]),
                                                    e("div", { staticClass: "col-2" }, [t._v(t._s(s.votes_sp))]),
                                                    e("div", { staticClass: "col-7" }, [t._v(t._s(s.votes_description))]),
                                                ]),
                                            ]);
                                        }),
                                        0
                                    ),
                                ]),
                            ]),
                        ],
                        1
                    );
                },
                a = [],
                r = (e("ac6a"), e("7f7f"), e("55dd"), e("96cf"), e("1da1")),
                i = e("1429"),
                n = e("2b53"),
                c = e("766b"),
                l = e("9944"),
                v = e("db49"),
                p = e("4d78"),
                d = {
                    name: "ProposalPage",
                    data: function () {
                        return { proposal: { url: "" }, votes: [], sort_order: "votes", display_button: "Vote", saving: !1 };
                    },
                    components: { HeaderEFTG: i["a"] },
                    mixins: [p["a"], n["a"], c["a"]],
                    created: function () {
                        var t = this;
                        this.getChainProperties().then(function () {
                            t.getProposal();
                        });
                    },
                    watch: {
                        sort_order: function (t) {
                            this.sortBy(t);
                        },
                    },
                    methods: {
                        getProposal: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var s, e, o, a;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return (s = this.$route.params.id), (t.next = 3), this.steem_database_call("find_proposals", [[s]]);
                                                    case 3:
                                                        if (((e = t.sent), console.log(e), e && 0 != e.length)) {
                                                            t.next = 8;
                                                            break;
                                                        }
                                                        throw (this.showDanger("Proposal number #".concat(s, " does not exists")), new Error("Proposal number #".concat(s, " does not exists")));
                                                    case 8:
                                                        (o = e[0]),
                                                            (a = new Date(o.end_date) - new Date(o.start_date)),
                                                            (o.url = v["a"].EXPLORER + "@" + o.creator + "/" + o.permlink),
                                                            (o.image = "https://img.blurt.world/profileimage/" + o.creator),
                                                            (o.image_receiver = "https://img.blurt.world/profileimage/" + o.receiver),
                                                            (o.votes_sp = this.witnessVotes2sp(o.total_votes)),
                                                            (o.vote = !1),
                                                            (o.newVote = !1),
                                                            (o.total_time = l["a"].textTime(a)),
                                                            (o.total_pay = ((parseFloat(o.daily_pay) * a) / 864e5).toFixed(3) + " " + v["a"].SP),
                                                            (o.active = this.isActive(o)),
                                                            (o.status = o.active ? "active" : "inactive"),
                                                            o.active
                                                                ? ((o.status = "active"), (o.status_extended = ""))
                                                                : ((o.status = "inactive"), (o.status_extended = "(becomes active in ".concat(l["a"].textTime(new Date(o.start_date + "Z") - Date.now()), ")"))),
                                                            (this.proposal = o),
                                                            console.log("total votes ".concat(o.total_votes)),
                                                            this.$store.state.auth.logged && this.loadVotesFromAccount(),
                                                            this.loadVotes();
                                                    case 25:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function s() {
                                return t.apply(this, arguments);
                            }
                            return s;
                        })(),
                        sortBy: function (t) {
                            switch (t) {
                                case "votes":
                                    return void this.votes.sort(function (t, s) {
                                        return parseInt(s.votes) - parseInt(t.votes);
                                    });
                                case "name":
                                    return void this.votes.sort(function (t, s) {
                                        return t.voter.localeCompare(s.voter);
                                    });
                                default:
                                    throw new Error("The type '".concat(t, "' for sort does not exists"));
                            }
                        },
                        isActive: function (t) {
                            var s = Date.now();
                            return s <= new Date(t.end_date + "Z") && s >= new Date(t.start_date + "Z");
                        },
                        loadVotes: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var s, e, o, a, r, i, n, c, l;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        (s = this.proposal), (s.total_votes = 0), (e = ""), (o = !1), (a = []);
                                                    case 5:
                                                        if (o) {
                                                            t.next = 26;
                                                            break;
                                                        }
                                                        return (t.next = 8), this.steem_database_call("list_proposal_votes", [[s.id, e], 100, "by_proposal_voter"]);
                                                    case 8:
                                                        if (((r = t.sent), 1 != r.length)) {
                                                            t.next = 14;
                                                            break;
                                                        }
                                                        (o = !0), r[0].proposal.id == s.id && a.push(r[0].voter), (t.next = 23);
                                                        break;
                                                    case 14:
                                                        i = 0;
                                                    case 15:
                                                        if (!(i < r.length - 1)) {
                                                            t.next = 23;
                                                            break;
                                                        }
                                                        if (r[i].proposal.id === s.id) {
                                                            t.next = 19;
                                                            break;
                                                        }
                                                        return (o = !0), t.abrupt("break", 23);
                                                    case 19:
                                                        a.push(r[i].voter);
                                                    case 20:
                                                        i++, (t.next = 15);
                                                        break;
                                                    case 23:
                                                        (e = r[r.length - 1].voter), (t.next = 5);
                                                        break;
                                                    case 26:
                                                        return console.log("voters of id ".concat(s.id)), console.log(a), (this.votes = []), (t.next = 31), this.steem_database_call("get_accounts", [a]);
                                                    case 31:
                                                        for (i in ((n = t.sent), n)) (c = n[i]), (l = this.calculate_vote(c)), this.votes.push(l), (s.total_votes += l.votes);
                                                        console.log("total votes ".concat(s.total_votes)), (s.votes_sp = this.witnessVotes2sp(s.total_votes)), (this.proposal = s), this.sortBy(this.sort_order);
                                                    case 37:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function s() {
                                return t.apply(this, arguments);
                            }
                            return s;
                        })(),
                        witness_vote_weight: function (t) {
                            return "" !== t.proxy ? 0 : this.no_proxy_vote_weight(t) + this.proxy_vote_weight(t);
                        },
                        no_proxy_vote_weight: function (t) {
                            return Math.floor(1e6 * parseFloat(t.vesting_shares));
                        },
                        proxy_vote_weight: function (t) {
                            var s = 0;
                            for (var e in t.proxied_vsf_votes) s += parseInt(t.proxied_vsf_votes[e]);
                            return s;
                        },
                        calculate_vote: function (t) {
                            var s = { voter: t.name, votes: this.witness_vote_weight(t), no_proxy_votes: this.no_proxy_vote_weight(t), proxy_votes: this.proxy_vote_weight(t) };
                            return (
                                "" === t.proxy
                                    ? ((s.votes_sp = this.witnessVotes2sp(s.votes)),
                                      s.proxy_votes > 0 ? (s.votes_description = "(".concat(this.witnessVotes2sp(s.no_proxy_votes), " + ").concat(this.witnessVotes2sp(s.proxy_votes), " proxy)")) : (s.votes_description = ""))
                                    : ((s.votes_sp = this.witnessVotes2sp(0)),
                                      (s.votes_description = "(".concat(this.witnessVotes2sp(s.no_proxy_votes))),
                                      s.proxy_votes > 0 && (s.votes_description += " + ".concat(this.witnessVotes2sp(s.proxy_votes), " proxy,")),
                                      (s.votes_description += " proxied to @".concat(t.proxy, ")"))),
                                s
                            );
                        },
                        loadVotesFromAccount: (function () {
                            var t = Object(r["a"])(
                                regeneratorRuntime.mark(function t() {
                                    var s, e, o;
                                    return regeneratorRuntime.wrap(
                                        function (t) {
                                            while (1)
                                                switch ((t.prev = t.next)) {
                                                    case 0:
                                                        return (
                                                            (s = this.$store.state.auth.user), (e = this.$route.params.id), this.clearVotes(), (t.next = 5), this.steem_database_call("list_proposal_votes", [[s, e], 1, "by_voter_proposal"])
                                                        );
                                                    case 5:
                                                        (o = t.sent), o && 0 != o.length ? ((this.proposal.vote = !0), (this.display_button = "Remove vote")) : ((this.proposal.vote = !1), (this.display_button = "Vote"));
                                                    case 7:
                                                    case "end":
                                                        return t.stop();
                                                }
                                        },
                                        t,
                                        this
                                    );
                                })
                            );
                            function s() {
                                return t.apply(this, arguments);
                            }
                            return s;
                        })(),
                        vote: function () {
                            var t = this.$store.state.auth.user,
                                s = this.$store.state.auth.keys.active,
                                e = this.$store.state.auth.keys.owner,
                                o = null,
                                a = this.$route.params.id;
                            if (null != s) o = s;
                            else {
                                if (null == e) return void this.showDanger("Please login with master, owner, or active key");
                                o = e;
                            }
                            var r = [["update_proposal_votes", { voter: t, proposal_ids: [a], approve: !this.proposal.vote, extensions: [] }]];
                            (this.saving = !0), this.hideSuccess(), this.hideDanger(), this.hideInfo();
                            var i = this;
                            this.steem_broadcast_sendOperations(r, o)
                                .then(function (t) {
                                    (i.saving = !1), i.showSuccess('<a href="'.concat(v["a"].EXPLORER2, "b/").concat(t.block_num, "/").concat(t.id, '" class="alert-link" target="_blank">Vote saved!</a>')), i.loadVotesFromAccount();
                                })
                                .catch(function (t) {
                                    throw ((i.saving = !1), i.showDanger(t.message), console.log("operations"), console.log(r), t);
                                });
                        },
                        onLogin: function () {
                            this.loadVotesFromAccount(), this.hideSuccess(), this.hideDanger(), this.hideInfo();
                        },
                        onLogout: function () {
                            this.hideSuccess(), this.hideDanger(), this.hideInfo();
                        },
                    },
                },
                _ = d,
                u = (e("5a78"), e("2877")),
                h = Object(u["a"])(_, o, a, !1, null, "4c5111de", null);
            s["default"] = h.exports;
        },
    },
]);
//# sourceMappingURL=chunk-7141bc53.aa950e99.js.map
