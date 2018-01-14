export class LinkMenuModel {
  label: string;
  icon: string;
  link: string;
  sub?: Array<LinkMenuModel>;

  constructor(label: string,
              icon: string,
              link: string,
              sub?: Array<LinkMenuModel>) {
    this.label = label;
    this.icon = icon;
    this.link = link;
    this.sub = sub;
  }
}
