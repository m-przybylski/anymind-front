// tslint:disable:no-let
// tslint:disable:no-empty
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';

interface IShortLink {
  url: string;
  icon: string;
}

@Injectable()
export class ProfileLinksComponentService {

  private readonly httpPattern = /^(?:http?:\/\/)?(?:www\.)|(?:http?:\/\/)/i;
  private readonly httpsPattern = /^(?:https?:\/\/)?(?:www\.)|(?:https?:\/\/)/i;

  constructor() {
  }

  public unifyLinkProtocol = (value: string): string => {
    if (this.isSocialLink(value)) {
      return this.setSocialLinkSSLProtocol(value);
    } else {
     return this.checkProtocol(value);
    }
  }

  public isSocialLink = (value: string): boolean =>
    (value.includes('facebook.com') || value.includes('twitter.com') ||
      value.includes('linkedin.com'))

  public cropSocialMediaLinkAsName = (link: string): IShortLink => {
    const socialMediaLinks = {
      facebook: {
        url: 'https://www.facebook.com/',
        icon: 'icon icon-facebook'
      },
      twitter: {
        url: 'https://www.twitter.com/',
        icon: 'icon icon-twitter'
      },
      linkedIn: {
        url: 'https://www.linkedin.com/in/',
        icon: 'icon icon-linkedin'
      }
    };

    let shortLink: IShortLink = {
      icon: '',
      url: ''
    };

    if (link.includes(socialMediaLinks.facebook.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.facebook.url)[1],
        icon: socialMediaLinks.facebook.icon
      };
    } else if (link.includes(socialMediaLinks.twitter.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.twitter.url)[1],
        icon: socialMediaLinks.twitter.icon
      };
    } else if (link.includes(socialMediaLinks.linkedIn.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.linkedIn.url)[1],
        icon: socialMediaLinks.linkedIn.icon
      };
    }
    return shortLink;
  }

  private checkProtocol = (addressUrl: string): string => {
    if (this.httpPattern.test(addressUrl)) {
      return `http://www.${addressUrl.replace(this.httpPattern, '')}`;
    } else if (this.httpsPattern.test(addressUrl)) {
      return `https://www.${addressUrl.replace(this.httpsPattern, '')}`;
    }
    return '';
  }

  private setSocialLinkSSLProtocol = (addressUrl: string): string =>
    `https://www.${addressUrl.replace(this.httpsPattern, '')}`
}