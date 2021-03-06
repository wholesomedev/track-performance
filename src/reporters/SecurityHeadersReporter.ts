import got from 'got';
import { PageReporter, Report } from '../typings/reporter';
import { defaultFormat } from '../helpers/format';

export class SecurityHeadersReporter implements PageReporter {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getReports(): Promise<Report[]> {
    const response = await got.head('https://securityheaders.io/', {
      query: {
        q: this.url,
        followRedirects: true,
      },
      followRedirect: true,
    });

    return [
      {
        name: 'Security Headers',
        testName: 'URL',
        scoreNames: ['Grade'],
        records: [
          {
            name: this.url,
            scores: [response.headers['x-grade'] as string],
            formatScore: defaultFormat,
          },
        ],
      },
    ];
  }
}
