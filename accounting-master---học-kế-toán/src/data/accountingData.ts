export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  examples: string[];
  quiz: QuizQuestion[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    title: "Chương 1: Nguyên lý kế toán",
    description: "Những khái niệm cơ bản nhất về kế toán, đối tượng và phương pháp hạch toán.",
    lessons: [
      {
        id: "l1",
        title: "1.1 Khái niệm và Đối tượng kế toán",
        content: `Kế toán là việc thu thập, xử lý, kiểm tra, phân tích và cung cấp thông tin kinh tế, tài chính dưới hình thức giá trị, hiện vật và thời gian lao động.
        
Đối tượng của kế toán bao gồm:
- Tài sản: Là những nguồn lực do doanh nghiệp kiểm soát và có khả năng thu được lợi ích kinh tế trong tương lai.
- Nguồn vốn: Là những nguồn hình thành nên tài sản của doanh nghiệp (Nợ phải trả và Vốn chủ sở hữu).`,
        examples: [
          "Ví dụ: Doanh nghiệp vay ngân hàng 100 triệu để mua máy móc. Ở đây, Máy móc là Tài sản, Khoản vay ngân hàng là Nguồn vốn (Nợ phải trả).",
          "Ví dụ: Chủ sở hữu góp vốn 500 triệu bằng tiền mặt. Tiền mặt là Tài sản, Vốn góp là Nguồn vốn (Vốn chủ sở hữu)."
        ],
        quiz: [
          {
            id: "q1",
            question: "Phương trình kế toán cơ bản là gì?",
            options: [
              "Tài sản = Nợ phải trả - Vốn chủ sở hữu",
              "Tài sản = Nợ phải trả + Vốn chủ sở hữu",
              "Nguồn vốn = Tài sản + Nợ phải trả",
              "Vốn chủ sở hữu = Tài sản + Nợ phải trả"
            ],
            correctAnswer: 1,
            explanation: "Tài sản luôn bằng tổng Nguồn vốn hình thành nên nó, bao gồm Nợ phải trả và Vốn chủ sở hữu."
          },
          {
            id: "q2",
            question: "Tiền mặt tại quỹ của doanh nghiệp thuộc nhóm nào?",
            options: [
              "Nợ phải trả",
              "Vốn chủ sở hữu",
              "Tài sản",
              "Doanh thu"
            ],
            correctAnswer: 2,
            explanation: "Tiền mặt là nguồn lực do doanh nghiệp kiểm soát và mang lại lợi ích kinh tế, nên nó là Tài sản."
          },
          {
            id: "q3",
            question: "Khoản vay ngân hàng của doanh nghiệp được phân loại là:",
            options: [
              "Tài sản ngắn hạn",
              "Vốn chủ sở hữu",
              "Nợ phải trả",
              "Chi phí"
            ],
            correctAnswer: 2,
            explanation: "Vay ngân hàng là một nghĩa vụ hiện tại của doanh nghiệp phát sinh từ các sự kiện đã qua, phải thanh toán bằng nguồn lực của mình."
          }
        ]
      }
    ]
  },
  {
    id: "ch2",
    title: "Chương 2: Chứng từ kế toán",
    description: "Cách lập và quản lý các loại chứng từ trong giao dịch kinh tế.",
    lessons: []
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: "f1",
    term: "Asset (Tài sản)",
    definition: "Nguồn lực do doanh nghiệp kiểm soát và có khả năng thu được lợi ích kinh tế trong tương lai.",
    category: "Cơ bản"
  },
  {
    id: "f2",
    term: "Liability (Nợ phải trả)",
    definition: "Nghĩa vụ hiện tại của doanh nghiệp phát sinh từ các sự kiện đã qua, việc thanh toán dẫn đến sự sụt giảm nguồn lực.",
    category: "Cơ bản"
  },
  {
    id: "f3",
    term: "Equity (Vốn chủ sở hữu)",
    definition: "Giá trị vốn của doanh nghiệp, được tính bằng số chênh lệch giữa giá trị Tài sản trừ Nợ phải trả.",
    category: "Cơ bản"
  },
  {
    id: "f4",
    term: "Revenue (Doanh thu)",
    definition: "Tổng giá trị các lợi ích kinh tế doanh nghiệp thu được trong kỳ kế toán, phát sinh từ các hoạt động sản xuất, kinh doanh thông thường.",
    category: "Kết quả"
  },
  {
    id: "f5",
    term: "Expense (Chi phí)",
    definition: "Tổng các khoản làm giảm lợi ích kinh tế trong kỳ kế toán dưới hình thức các khoản tiền chi ra, các khoản khấu trừ tài sản.",
    category: "Kết quả"
  }
];
