import { sha1 } from "./hash.ts";

export class GameJoltApi {
  constructor(
    private readonly gameId: string,
    private readonly privateKey: string,
    public baseUrl = 'https://api.gamejolt.com/api/game',
    public version = 'v1_2'
  ) { }

  url(actionPath: string = ''): URL {
    const result = new URL(this.baseUrl);
    const pathParts = [result.pathname, this.version];
    if (actionPath) {
      pathParts.push(actionPath);
    }
    result.pathname = pathParts.join('/');
    return result;
  }

  private async signUrl(url: URL): Promise<URL> {
    const toSign = `${url.toString()}${this.privateKey}`;
    const signature = await sha1(toSign);
    url.searchParams.set('signature', signature);
    return url;
  }

  async user(username: string) {
    const url = this.url('users');
    url.searchParams.set('game_id', this.gameId);
    url.searchParams.set('username', username);
    await this.signUrl(url);
    console.log(url.toString());
    const response = await fetch(url.toString());
    return response.json();
  }

  async userAuth(username: string, userToken: string) {
    const url = this.url('users/auth');
    url.searchParams.set('username', username);
    url.searchParams.set('user_token', userToken);
    const response = await fetch(url.toString());
    return response.json();
  }
}
