"use client"
import { ThemeChanger } from "@/shared/redux/action";
import Link from "next/link";
import { Fragment } from "react";
import { connect } from "react-redux";

function Ecommercemenuloop({ local_varaiable, Ecommercemenuitems, toggleSidemenu, level, HoverToggleInnerMenuFn }: any) {

  return (
    <Fragment>
      <Link href="#!" scroll={false} className={`side-menu__item ${Ecommercemenuitems?.selected ? "active" : ""}`}
        onClick={(event) => { event.preventDefault(); toggleSidemenu(event, Ecommercemenuitems); }} onMouseEnter={(event) => HoverToggleInnerMenuFn(event, Ecommercemenuitems)}>
        <i className="ri-arrow-down-s-line side-menu__angle"></i>
        <span className={`${level == 1 ? "side-menu__label" : ""}`}> {Ecommercemenuitems.title}
        </span>
      </Link>
      <ul className={`slide-menu child${level} active ${Ecommercemenuitems?.dirchange ? "force-left" : ""}  `} style={Ecommercemenuitems.active ? { display: "block" } : { display: "none" }}>
        {Ecommercemenuitems.children.map((firstlevel: any, index: any) =>
          <li className={`${firstlevel?.type == 'link' ? 'slide' : ''} ${firstlevel?.type == 'sub' ? 'slide has-sub' : ''} ${firstlevel?.selected ? 'active' : ''}`} key={index}>
            {firstlevel.type === "link" ?
              <Link href={firstlevel.path} scroll={false} className={`side-menu__item ${firstlevel.selected ? 'active' : ''}`}>
                {firstlevel.title}
              </Link>
              : ""}
            {firstlevel.type === "sub" ?
              <Ecommercemenuloop Ecommercemenuitems={firstlevel} toggleSidemenu={toggleSidemenu} HoverToggleInnerMenuFn={HoverToggleInnerMenuFn} level={level + 1} />
              : ''}

          </li>
        )}

      </ul>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Ecommercemenuloop);
