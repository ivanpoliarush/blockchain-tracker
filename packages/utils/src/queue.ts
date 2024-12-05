interface Options {
	maxTasksCount: number;
}

type Task = () => Promise<any>;

export class Queue {
	private tasks: Task[];
	private results: any[];

	constructor(private readonly options: Options) {}

	async run<R>(tasks: Task[]): Promise<R[]> {
		this.results = [];
		this.tasks = tasks;
		await this.runChunk();
		return this.results;
	}

	async runChunk() {
		if (!this.tasks.length) {
			return;
		}

		const tasksChunk = this.tasks.splice(0, this.options.maxTasksCount);
		const results = await Promise.all(tasksChunk.map((task) => task()));
		this.results.push(...results);

		await this.runChunk();
	}
}
