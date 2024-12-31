export interface HttpResponse {
	statusCode: number;
	status: boolean;
	messages: [
		{
			messageCode: number,
			messageDescription: string,
			messageTranslateCode: string,
			exceptionMessage: string | null,
			validationMessage: string | null;
		}
	];
	data: any;
}

export interface LoginReqBody {
	email: string;
	password: string;
	secOrgId: number;
}
